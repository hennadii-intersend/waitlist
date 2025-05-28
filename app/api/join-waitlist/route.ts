import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Define a basic type for our database if we were using generated types
// For now, we'll use <any> or be explicit with table/column names.
// interface Database {
//   public: {
//     Tables: {
//       waitlist_entries: {
//         Row: { id: string; email: string; created_at: string };
//         Insert: { email: string; created_at?: string };
//       };
//     };
//   };
// }

async function sendTelegramNotification(email: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log('[Telegram] Attempting to send notification for:', email);
  console.log('[Telegram] Bot Token Loaded:', !!botToken ? 'Yes, length: ' + botToken.length : 'No, undefined or empty');
  console.log('[Telegram] Chat ID Loaded:', !!chatId ? 'Yes, value: ' + chatId : 'No, undefined or empty');

  if (!botToken || !chatId) {
    console.error('[Telegram] Error: Bot Token or Chat ID is not configured or missing from .env.local. Make sure they are defined server-side.');
    return; // Don't block the main flow
  }

  const message = `🎉 New waitlist signup! 🎉\n\nEmail: ${email}`;
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  console.log('[Telegram] Constructed API URL:', telegramApiUrl.replace(botToken, 'BOT_TOKEN_REDACTED')); // Avoid logging the full token

  try {
    console.log('[Telegram] Sending request to Telegram API...');
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to parse error response" }));
      console.error('[Telegram] Failed to send notification. Status:', response.status, 'Response:', errorData);
    } else {
      const successData = await response.json().catch(() => ({ message: "Failed to parse success response" }));
      console.log('[Telegram] Notification sent successfully. Email:', email, 'Response:', successData);
    }
  } catch (error) {
    console.error('[Telegram] Exception caught while sending notification:', error);
  }
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { success: false, message: 'Server configuration error.' },
      { status: 500 }
    );
  }

  // Initialize Supabase client with the service role key for admin-level access
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let email: string;
  try {
    const body = await request.json();
    email = body.email;
  } catch (_error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  if (!email || typeof email !== 'string') {
    return NextResponse.json(
      { success: false, message: 'Email is required.' },
      { status: 400 }
    );
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_entries')
      .insert([{ email: email }]) // Supabase expects an array of objects for insert
      .select(); // .select() is optional here if you don't need the inserted data back

    if (error) {
      console.error('Supabase error:', error);
      // Check for unique constraint violation (code 23505 for PostgreSQL)
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, message: 'This email is already on the waitlist.' },
          { status: 409 } // 409 Conflict
        );
      }
      return NextResponse.json(
        { success: false, message: 'Could not join the waitlist. Please try again.' },
        { status: 500 }
      );
    }

    // Send Telegram notification (fire and forget)
    sendTelegramNotification(email);

    return NextResponse.json(
      { success: true, message: 'Successfully joined the waitlist!', data },
      { status: 201 } // 201 Created
    );
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
