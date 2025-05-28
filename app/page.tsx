'use client'; // Required for useState and event handlers

import Image from 'next/image';
import { useState, FormEvent } from 'react';
import styles from './page.module.css';
import Chip from '../components/Chip/Chip';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';

export default function HomePage() {
  const flameIcon = <Image src="/images/lucide-flame.svg" alt="Flame Icon" width={15} height={15} />;
  const arrowRightIcon = <Image src="/images/arrow-right.svg" alt="Arrow Right" width={16} height={16} />;

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    if (!email) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage(result.message || 'Successfully joined the waitlist!');
        setMessageType('success');
        setEmail(''); // Clear input on success
      } else {
        setMessage(result.message || 'An error occurred.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to connect to the server. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {/* Decorative Background Rectangles removed as per new Figma data */}

      {/* Holo Diamond Images */}
      <Image src="/images/holo-diamond.png" alt="" width={150} height={154} className={`${styles.holoDiamond} ${styles.diamond1}`} priority />
      <Image src="/images/holo-diamond.png" alt="" width={150} height={154} className={`${styles.holoDiamond} ${styles.diamond2}`} />
      <Image src="/images/holo-diamond.png" alt="" width={150} height={154} className={`${styles.holoDiamond} ${styles.diamond3}`} />
      <Image src="/images/holo-diamond.png" alt="" width={150} height={154} className={`${styles.holoDiamond} ${styles.diamond4}`} priority />
      
      <div className={styles.contentWrapper}> {/* Corresponds to Frame 3 (node 544:23254) */}
        
        <div className={styles.chipOuterContainer}> {/* Corresponds to Frame 4 (node 544:23255) */}
          <Chip icon={flameIcon} text="Coming Soon to Mobile" />
        </div>

        <div className={styles.textContainer}> {/* Corresponds to Frame 5 (node 544:23262) */}
          <h1 className={styles.mainHeading}>
            {"Thank You For \nExperimenting With Us"}
          </h1>
          <p className={styles.paragraph}>
            {"Based on your feedback we’re launching mobile-first crypto wallet. Organize onchain activities and elevate productivity like never before."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainerOuter}> {/* Corresponds to Frame 6 (544:23001) */}
          <div className={styles.formContainerInner}> {/* Corresponds to Frame 1 (544:23002) */}
            <div className={styles.inputWrapper}>
              <InputField 
                placeholder="Your email address" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button iconEnd={arrowRightIcon} hasIconEnd={true} disabled={isLoading}>
              {isLoading ? 'Joining...' : 'Join waitlist'}
            </Button>
          </div>
          {message && (
            <p className={`${styles.message} ${messageType === 'error' ? styles.errorMessage : styles.successMessage}`}>
              {message}
            </p>
          )}
        </form>
      </div>

      <footer className={styles.footerWrapper}> {/* Corresponds to Frame 9 (544:23006) */}
        <div className={styles.footerContent}> {/* Corresponds to Frame 2 (544:23008) */}
          <span className={styles.footerText}>© 2025 Interspace</span>
          <div className={styles.socialIconsContainer}> {/* Corresponds to Frame 8 (544:23017) */}
            <a href="https://x.com/interspace_fi" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialIcon}>
              <Image src="/images/lucide-twitter.svg" alt="Twitter" width={20} height={20} />
            </a>
            <a href="https://www.linkedin.com/company/interspace-fi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <Image src="/images/lucide-linkedin.svg" alt="LinkedIn" width={20} height={20} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
