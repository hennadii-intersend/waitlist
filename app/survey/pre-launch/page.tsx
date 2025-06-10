'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image'; // Import Image
import styles from './page.module.css'; // This will be updated to match main page styles
import Button from '../../../components/Button/Button'; // Import custom Button

export default function PreLaunchSurveyPage() {
  const arrowRightIcon = <Image src="/images/arrow-right.svg" alt="Arrow Right" width={16} height={16} />; // Add icon for button

  // Basic Information
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [howFound, setHowFound] = useState('');
  const [howFoundOther, setHowFoundOther] = useState('');

  // Current Crypto Experience
  const [cryptoExperience, setCryptoExperience] = useState('');
  const [currentWallets, setCurrentWallets] = useState<string[]>([]);
  const [currentWalletsOther, setCurrentWalletsOther] = useState('');
  const [managedWalletsCount, setManagedWalletsCount] = useState('');

  // Pain Points & Usage
  const [regularApps, setRegularApps] = useState<string[]>([]);
  const [regularAppsOther, setRegularAppsOther] = useState('');
  const [manageAppAccess, setManageAppAccess] = useState('');
  const [manageAppAccessOther, setManageAppAccessOther] = useState('');

  // Optional Feedback
  const [wishlistFeature, setWishlistFeature] = useState('');
  const [betaInterest, setBetaInterest] = useState('');
  // Adding a comment to trigger a new commit
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    const { value, checked } = e.target;
    setState(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

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

    const surveyData = {
      email,
      name,
      howFound: howFound === 'Other' ? howFoundOther : howFound,
      cryptoExperience,
      currentWallets: currentWallets.includes('Other') 
        ? [...currentWallets.filter(w => w !== 'Other'), `Other: ${currentWalletsOther}`] 
        : currentWallets,
      managedWalletsCount,
      regularApps: regularApps.includes('Other')
        ? [...regularApps.filter(a => a !== 'Other'), `Other: ${regularAppsOther}`]
        : regularApps,
      manageAppAccess: manageAppAccess === 'Other' ? manageAppAccessOther : manageAppAccess,
      wishlistFeature,
      betaInterest,
    };

    try {
      const response = await fetch('/api/survey/pre-launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage(result.message || 'Survey submitted successfully!');
        setMessageType('success');
        // Optionally reset form fields
      } else {
        setMessage(result.message || 'An error occurred while submitting the survey.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Survey submission error:', error);
      setMessage('Failed to connect to the server. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const howFoundOptions = ["Twitter/X", "LinkedIn", "Telegram", "Discord", "Friend/Referral", "Search Engine", "Blog/Article", "Other"];
  const cryptoExperienceOptions = ["Less than 6 months", "6 months - 1 year", "1-3 years", "3+ years"];
  const walletOptions = ["MetaMask", "Rabby", "Phantom", "Rainbow", "Trust Wallet", "Zerion", "Frame", "OKX Wallet", "Safe (Gnosis Safe)", "Coinbase Wallet", "Ledger Live", "Other"];
  const managedWalletsCountOptions = ["1-2", "3-5", "6-10", "More than 10"];
  const appOptions = ["Aave", "Uniswap", "OpenSea", "Blur", "Compound", "Hyperliquid", "DeFiLlama Swap", "Jumper Exchange", "Beefy Finance", "GMX", "dYdX", "Other"];
  const manageAccessOptions = ["Browser bookmarks", "Wallet app integrations", "Manually type URLs", "Search each time", "Other"];
  const betaInterestOptions = ["Yes, I'm very interested", "Maybe, depends on time commitment", "No, I'll wait for full release"];

  return (
    <main className={styles.main}> {/* Use main page's .main style */}
      {/* Holo Diamond Images from main page */}
      <Image src="/images/holo-diamond.png" alt="" width={150} height={154} className={`${styles.holoDiamond} ${styles.diamond1}`} priority />
      <Image src="/images/holo-diamond.png" alt="" width={150} height={154} className={`${styles.holoDiamond} ${styles.diamond2}`} />
      <Image src="/images/holo-diamond.png" alt="" width={150} height={154} className={`${styles.holoDiamond} ${styles.diamond3}`} />
      <Image src="/images/holo-diamond.png" alt="" width={150} height={154} className={`${styles.holoDiamond} ${styles.diamond4}`} priority />
      
      <div className={styles.contentWrapper}> {/* Use main page's .contentWrapper style */}
        <div className={styles.surveyContainer}> {/* New container for survey form itself */}
            <h1 className={styles.title}>Interspace Pre-launch Survey</h1>
            
            <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Basic Information</h2>
                <div className={styles.formGroup}>
                <label htmlFor="email">1. Email *</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="name">2. Name (optional)</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading}/>
                </div>
                <div className={styles.formGroup}>
                <label>3. How did you find out about Interspace? (optional)</label>
                <div className={styles.radioGroup}>
                    {howFoundOptions.map(option => (<label key={option}><input type="radio" name="howFound" value={option} checked={howFound === option} onChange={(e) => setHowFound(e.target.value)} disabled={isLoading}/>{option}</label>))}
                </div>
                {howFound === 'Other' && (<input type="text" className={styles.otherSpecifyInput} placeholder="Please specify" value={howFoundOther} onChange={(e) => setHowFoundOther(e.target.value)} disabled={isLoading}/>)}
                </div>
            </section>

            {/* Current Crypto Experience */}
            <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Current Crypto Experience</h2>
            <div className={styles.formGroup}>
              <label>4. How long have you been using crypto?</label>
              <div className={styles.radioGroup}>
                {cryptoExperienceOptions.map(option => (<label key={option}><input type="radio" name="cryptoExperience" value={option} checked={cryptoExperience === option} onChange={(e) => setCryptoExperience(e.target.value)} disabled={isLoading}/>{option}</label>))}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>5. Which wallets do you currently use? (Select all that apply)</label>
              <div className={styles.checkboxGroup}>
                {walletOptions.map(option => (<label key={option}><input type="checkbox" value={option} checked={currentWallets.includes(option)} onChange={(e) => handleCheckboxChange(e, setCurrentWallets)} disabled={isLoading}/>{option}</label>))}
              </div>
              {currentWallets.includes('Other') && (<input type="text" className={styles.otherSpecifyInput} placeholder="Please specify other wallet(s)" value={currentWalletsOther} onChange={(e) => setCurrentWalletsOther(e.target.value)} disabled={isLoading}/>)}
            </div>
            <div className={styles.formGroup}>
              <label>6. How many crypto wallets/accounts do you actively manage?</label>
              <div className={styles.radioGroup}>
                {managedWalletsCountOptions.map(option => (<label key={option}><input type="radio" name="managedWalletsCount" value={option} checked={managedWalletsCount === option} onChange={(e) => setManagedWalletsCount(e.target.value)} disabled={isLoading}/>{option}</label>))}
              </div>
                </div>
            </section>

            {/* Pain Points & Usage */}
            <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Pain Points & Usage</h2>
            {/* Question 7 & 8 removed as per request */}
            <div className={styles.formGroup}>
              <label>9. Which DeFi/Web3 apps do you use regularly? (Select all that apply)</label>
              <div className={styles.checkboxGroup}>
                {appOptions.map(option => (<label key={option}><input type="checkbox" value={option} checked={regularApps.includes(option)} onChange={(e) => handleCheckboxChange(e, setRegularApps)} disabled={isLoading}/>{option}</label>))}
              </div>
              {regularApps.includes('Other') && (<input type="text" className={styles.otherSpecifyInput} placeholder="Please specify other app(s)" value={regularAppsOther} onChange={(e) => setRegularAppsOther(e.target.value)} disabled={isLoading}/>)}
            </div>
            <div className={styles.formGroup}>
              <label>10. How do you currently manage accessing your frequently used apps?</label>
              <div className={styles.radioGroup}>
                {manageAccessOptions.map(option => (<label key={option}><input type="radio" name="manageAppAccess" value={option} checked={manageAppAccess === option} onChange={(e) => setManageAppAccess(e.target.value)} disabled={isLoading}/>{option}</label>))}
              </div>
              {manageAppAccess === 'Other' && (<input type="text" className={styles.otherSpecifyInput} placeholder="Please specify" value={manageAppAccessOther} onChange={(e) => setManageAppAccessOther(e.target.value)} disabled={isLoading}/>)}
                </div>
            </section>

            {/* Feature Interest section removed as per request */}

            {/* Optional Feedback */}
            <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Optional Feedback</h2>
            <div className={styles.formGroup}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <label htmlFor="wishlistFeature">13. What's one feature you wish every crypto wallet had? (optional)</label>
              <textarea id="wishlistFeature" value={wishlistFeature} onChange={(e) => setWishlistFeature(e.target.value)} disabled={isLoading}></textarea>
            </div>
            <div className={styles.formGroup}>
              <label>14. Would you be interested in participating in beta testing and providing feedback? (optional)</label>
              <div className={styles.radioGroup}>
                {betaInterestOptions.map(option => (<label key={option}><input type="radio" name="betaInterest" value={option} checked={betaInterest === option} onChange={(e) => setBetaInterest(e.target.value)} disabled={isLoading}/>{option}</label>))}
              </div>
                </div>
            </section>

            <Button type="submit" disabled={isLoading} iconEnd={arrowRightIcon} hasIconEnd={true}>
                {isLoading ? 'Submitting...' : 'Submit Survey'}
            </Button>

            {message && (
                <p className={`${styles.message} ${messageType === 'error' ? styles.errorMessage : styles.successMessage}`}>
                {message}
                </p>
            )}
            </form>
        </div>
      </div>
      {/* Footer can be added here if needed, similar to main page */}
    </main>
  );
}
