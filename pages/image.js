// pages/index.js
import Head from 'next/head';
import styles from '/styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { isForStatement } from 'typescript';

export default function Home() {
  
  

  const [prompt, setPrompt] = useState('');
  const [image_0, setImage_0] = useState('');
  // const [image_1, setImage_1] = useState('');
  // const [image_2, setImage_2] = useState('');
  // const [image_3, setImage_3] = useState('');

  const router = useRouter();
  const {data : session} = useSession();
  const { userName, userImage, email} = router.query;
  const userName_i = userName;
  const userImage_i = userImage;
  const email_i = email;
  

  const signOutandHome = () =>{
    router.push({
      pathname : '/',
  });
  }

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [timestamp, setTimestamp] = useState('');

  // const selectImage = (selectedImage) => {
  //   setSelectedImage(selectedImage);
  // };

  const selectImage = (imagekey) => {
    setSelectedImage((selectedImage) =>
      selectedImage === imagekey ? '' : imagekey
    );
    switch (imagekey) {
      case image_0:
        setSelectedImageIndex(1);
        break;
      // case image_1:
      //   setSelectedImageIndex(2);
      //   break;
      // case image_2:
      //   setSelectedImageIndex(3);
      //   break;
      // case image_3:
      //   setSelectedImageIndex(4);
      //   break;
      default:
        setSelectedImageIndex(null);
    }
  };


  const goToTshirtPage = () =>{
    if (!selectedImage) {
      alert('Please select an image before proceeding to T-shirt details.'); // You can replace this with a more user-friendly notification or modal
      return;
    }
    router.push({
      pathname : 'App',
      query: {
        userName: userName_i,
        userImage: userImage_i,
        email: email_i,
        selectedImage: selectedImage,
        prompt: prompt,
        timestamp, timestamp,
        selectedImageIndex: selectedImageIndex,
        image_0: image_0,
        // image_1: image_1,
        // image_2: image_2,
        // image_3: image_3
      },
    
  });
}
  const generateImage = async () => {
    try {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const {image_0,timestamp} = await response.json();
        setImage_0(image_0);
        // setImage_1(image_1);
        // setImage_2(image_2);
        // setImage_3(image_3);
        setTimestamp(timestamp);
      } else {
        const { error } = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div  className={styles.container}>
      <Head>
        <title>IMAGE GENERATION FROM TWEET</title>
      </Head>

    <div>
      <div className={styles.userContainer}>
          {/* ... user details ... */}
          <img className={styles.profilePicture} src={userImage_i} alt={`${userName_i}'s profile picture`} />
          <br /><br />
          <p className={styles.userName}>{userName_i}</p>
          
        </div>

        <button className={styles.signOutButton} onClick={() => signOutandHome()}>
          Go to Home page to sign out
        </button>
        </div>

      <div className={styles.blueOutline}>
      <h1  >Enter tweet to generate image</h1>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className={styles.inputbox}/>
      <button onClick={generateImage}  className={styles.homeButton}>Generate Image</button>
      </div>
      <br />
      {/* {image_0 && <img src={`data:image/png;base64,${image_0}`} alt="First Image" width="300" height="300" />}
      {image_1 && <img src={`data:image/png;base64,${image_1}`} alt="Second Image" width="300" height="300" />}
      {image_2 && <img src={`data:image/png;base64,${image_2}`} alt="Third Image" width="300" height="300" />}
      {image_3 && <img src={`data:image/png;base64,${image_3}`} alt="Fourth Image" width="300" height="300" />} */}
<div className={styles.sampleContainer}>
<div className={styles.imageContainer}>
        {image_0 && (
          <div
          className={`${styles.image} ${selectedImage === image_0}`}
          onClick={() => selectImage(image_0)}
        >
          <img 
           src={`data:image/png;base64,${image_0}`}
            alt="First Image"
            width="250"
            height="250"
            style={{
              border: selectedImage === image_0 ? '5px solid rgb(83, 241, 255)' : 'none', // Add border style if the image is selected
            }}
          />
          </div>
        )}
        {/* {image_1 && (
          <div
          className={`${styles.image} ${selectedImage === image_1}`}
          onClick={() => selectImage(image_1)}
        >
          <img
            src={`data:image/png;base64,${image_1}`}
            alt="Second Image"
            width="250"
            height="250"
            style={{
              border: selectedImage === image_1 ? '5px solid rgb(83, 241, 255)' : 'none', // Add border style if the image is selected
            }}
          />
          </div>
        )} */}
        {/* {image_2 && (
          <div
          className={`${styles.image} ${selectedImage === image_2}`}
          onClick={() => selectImage(image_2)}
        >
          <img
            src={`data:image/png;base64,${image_2}`}
            alt="Third Image"
            width="250"
            height="2500"
            style={{
              border: selectedImage === image_2 ? '5px solid rgb(83, 241, 255)' : 'none', // Add border style if the image is selected
            }}
          />
          </div>
        )}
        {image_3 && (
          <div
          className={`${styles.image} ${selectedImage === image_3}`}
          onClick={() => selectImage(image_3)}
        >
          <img
            src={`data:image/png;base64,${image_3}`}
            alt="Fourth Image"
            width="250"
            height="250"
            style={{
              border: selectedImage === image_3 ? '5px solid rgb(83, 241, 255)' : 'none', // Add border style if the image is selected
            }}
          />
          </div>
        )} */}

      </div>
      
      <button className={styles.homeButton} onClick={goToTshirtPage}>
              Select T shirt details
        </button>
          </div>
    </div>
  );
}
