import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';


export default function Home() {
  //FOR ROUTING TO HOME PAGE
  const router = useRouter();

  const { data: session } = useSession();
  const goToimagePage = () => {
    router.push({
      pathname: 'image',
      query: {
        userName: session.user.name,
        userImage: session.user.image,
        email: session.user.email,
      },
    });
  };
  

  const signInviaDiffaccount = () =>{
    signOut();
  }



  // pages/index.js
// ... (other imports)

// const tweetfetch = async () => {
//   // Fetch user's tweets using the API route
//   const tweetResponse = await fetch('/api/get-user-tweets', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
//     },
//   });

//   if (tweetResponse.ok) {
//     const tweetData = await tweetResponse.json();

//     // Update the session with tweet data
//     if (session) {
//       const updatedSession = {
//         ...session,
//         tweet: tweetData.tweets, // Assuming the tweet data is nested under 'tweets'
//       };
//       mutate(updatedSession); // Update the session
//     }
//   } else {
//     console.error('Failed to fetch tweets');
//   }
// };

  return (
    <div className={styles.container}>

<div className={styles.backgroundAnimation} />
      <Head>
        <title>SIGN IN</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <span className={styles.gradientText}>Tweeshirt</span>
          ...
          
        </h1>

        {/* <img className={styles.logo} src="/logo.png"></img>  */}

        {session && (
          <>
            <div className={styles.userInfo}>
              <img
                className={styles.profilePicture}
                src={session.user.image}
                alt={`${session.user.name}'s profile`}
              />
              <p className={styles.userName}>
                Hello there, <span className={styles.gradientText}>{session.user.name}{' '}</span>!
              </p>

              

              <button className={styles.homeButton} onClick={goToimagePage}>
              Next
        </button>
            <p className={styles.userName}>Not your account?</p>
             <button className={styles.twitterButton} onClick={signInviaDiffaccount}>
                  Sign in Via a different account
              </button>
         
            </div>
            <button className={styles.signOutButton} onClick={() => signOut()}>
              Sign out
            </button>
          </>
        )}

        {!session && (
          <>
            <p className={styles.userName}>Sign in via <img className={styles.twitterIcon} src="/logo-white.png" alt="Twitter icon" /> to continue</p>
            <button className={styles.twitterButton} onClick={() => signIn('twitter')}>
              Sign in via
              <img className={styles.twitterIcon} src="/logo-black.png" alt="Twitter icon" />
            </button>
          </>
        )}


        
        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

        
        </div> */}

      </main>

      {/* Global styles */}
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        
        
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
