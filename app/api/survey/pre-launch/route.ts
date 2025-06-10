import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Ensure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Supabase URL or Service Role Key is missing from environment variables.');
  // Optionally, you could throw an error here or handle it gracefully
  // For now, this will cause client creation to fail if not set, which is caught below.
}

const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!);

export async function POST(request: Request) {
  try {
    const surveyData = await request.json();

    console.log('Received survey data:', surveyData);

    // Prepare data for Supabase insertion, mapping from surveyData to table columns
    // The SQL table uses snake_case, while JavaScript objects often use camelCase.
    // The surveyData object from the client is already structured with keys
    // that are close to what we need, but we need to handle the nested featureRanking.
    const dataToInsert = {
      email: surveyData.email,
      name: surveyData.name,
      how_found: surveyData.howFound, // Matches SQL column name
      crypto_experience: surveyData.cryptoExperience,
      current_wallets: surveyData.currentWallets,
      managed_wallets_count: surveyData.managedWalletsCount,
      regular_apps: surveyData.regularApps,
      manage_app_access: surveyData.manageAppAccess,
      wishlist_feature: surveyData.wishlistFeature,
      beta_interest: surveyData.betaInterest,
    };

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('pre_launch_survey_responses')
      .insert([dataToInsert])
      .select(); // .select() can be used to return the inserted data if needed

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ success: false, message: `Error saving survey data: ${error.message}` }, { status: 500 });
    }

    console.log('Survey data saved successfully:', data);
    return NextResponse.json({ success: true, message: 'Survey submitted successfully!' });

  } catch (error) {
    console.error('API Error:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
