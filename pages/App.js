import Head from 'next/head';
import styles from '/styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';

const App = () => {
  var updatedCustomerDetails = null;
  const signOutandHome = () =>{
    router.push({
      pathname : '/',
  });
  }
  
  const {data : session} = useSession();
  const router = useRouter();
  const { userName, userImage, email, selectedImage,prompt, timestamp,selectedImageIndex} = router.query;
  const userName_i = userName;
  const userImage_i = userImage;
  const email_i = email;

  /*FORM INITIALIZATION */
  const [currentStage, setCurrentStage] = useState(1);
  
 
  const goToNextStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  const gotBackToImagePage = () =>{
    router.push({
      pathname : 'image',
    })
  }


  const [file, setFile] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address1: '',
    address2: '',
    address3:'',
    pincode: '',
    city: '',
    mobileNumber: '',
    email: '',
    tshirtColor: '',
    tshirtSize: '',
    state: '',
    country:'',
    fileResponse:null
  });
  const [fileResponse, setFileResponse] = useState(null);
  const [formResponse, setFormResponse] = useState(null);

  // const setimage = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const setimage = () => {
      // Assuming you have the image reference or source stored somewhere
      const imageSource = selectedImage;
      setFile(imageSource);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleFormSubmit = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const url = 'https://api.printrove.com/api/external/designs';
    const AUTH_KEY = process.env.NEXT_PUBLIC_SKIBDSS;
    const headers = {
      Authorization: `Bearer ${AUTH_KEY}`,
      Accept: 'application/json',
    };

//     const base64String = 'your_base64_string_here';
// const base64Data = base64String.split(',')[1]; 

// Convert base64 to Blob
const binaryString = atob(file);
const arrayBuffer = new ArrayBuffer(binaryString.length);
const uint8Array = new Uint8Array(arrayBuffer);
for (let i = 0; i < binaryString.length; i++) {
  uint8Array[i] = binaryString.charCodeAt(i);
}
const blob = new Blob([arrayBuffer], { type: 'image/png' });
// Now you can append the blob to FormData
const formData = new FormData();
formData.append('file', blob, `${prompt}_${selectedImageIndex}_${email_i}_${timestamp}.png`);


    // const formData = new FormData();
    // formData.append('file', file);


    try {
      const response = await axios.post(url, formData, { headers });
      updatedCustomerDetails = {
        ...customerDetails,
        fileResponse: response.data,
      };
//   updatedCustomerDetails = {
//     ...customerDetails,
//     fileResponse: response.data,
//     };
      setFileResponse(response.data);
      console.log(response.data);
      console.log(customerDetails);
    } catch (error) {
      console.error('File Upload Error:', error);
    }
    const formUrl = 'https://tweeshirt-backend-api.onrender.com/submit_form'; // Replace with your actual form route

    try {
      const response = await axios.post(formUrl, updatedCustomerDetails);
      setFormResponse(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Form Submit Error:', error);
    }
  };
    

    const goToPreviousStage = () => {
      setCurrentStage(currentStage - 1);
    };
  
  

  // const handleFormSubmit = () => {
  //   if (!file) {
  //     alert('Please select a file');
  //     return;
  //   }
  
  //   const url = 'https://api.printrove.com/api/external/designs';
  //   const AUTH_KEY=process.env.AUTH_KEY_PRINTROVE
  
  //   const headers = {
  //     Authorization: `Bearer ${AUTH_KEY}`,
  //     Accept: 'application/json',
  //   };
  
  //   const formData = new FormData();
  //   formData.append('file', file);
  
  //   axios.post(url, formData, { headers })
  //     .then(response => {
  //       setCustomerDetails((prevDetails) => ({
  //         ...prevDetails,
  //         fileResponse: response.data,
  //       }));
  //       setFileResponse(response.data);
  //       console.log(response.data);
  //       console.log(customerDetails);
  
  //       const formUrl = 'http://localhost:3001/submit_form'; // Replace with your actual form route
  
  //       return axios.post(formUrl, customerDetails);
  //     })
  //     .then(response => {
  //       setFormResponse(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };
  

  return (
    

<div className={styles.container}>
        <Head>
          <title>T-SHIRT DETAILS</title>
        </Head>
        <button className={styles.signOutButton} onClick={() => signOutandHome()}>
          Go to home page to sign out
        </button>
        <div className={styles.userContainer}>
          {/* ... user details ... */}
          <img className={styles.profilePicture} src={userImage_i} alt={`${userName_i}'s profile picture`} />
          <br /><br />
          <p className={styles.userName}>{userName_i}</p>
        </div>
        
        
        
          {/* Stage 1: File Upload */}
          {currentStage === 1 && (
            
            <div className={styles.blueOutline}>
            <form>
              {/* ... file upload form ... */}
              {selectedImage ? (
              <img className={styles.imageconfirm} src={`data:image/png;base64,${selectedImage}`} alt="Selected Image" />
                ) : (
              <p>No image selected</p>
               )}
              <p className={styles.userName}>
                Are you sure you want to continue with this image?
              </p>
              <label>
            <input type="checkbox" onChange={setimage}/> 
            Yes, I wish to proceed with this image
            </label>
              <br />
              <button type="button" className={styles.homeButton}  style={{ marginLeft: '50px' }} onClick={gotBackToImagePage}>
                No, generate again
              </button>
              <button type="button" style={{ marginLeft: '90px' }}  className={styles.homeButton}  onClick={goToNextStage}>
                Yes, let's print!
              </button>
            </form>
            </div>
          )}

          {/* Stage 2: T-Shirt Details */}
          {currentStage === 2 && (
            <div className={styles.blueOutline}>
            <img className={styles.imageconfirm} src={`data:image/png;base64,${file}`}></img>
            <form>
            <h1  className={styles.userInfo}>T-shirt details : </h1>
            <label htmlFor="color">T-Shirt Color:</label>
            <select
              id="color"
              name="tshirtColor"
              value={customerDetails.tshirtColor}
              onChange={handleInputChange}
              required
            >
              <option value="Black">Black</option>
              <option value="Butter Yellow">Butter Yellow</option>
              <option value="Charcoal Grey">Charcoal Grey</option>
              <option value="Coffee Brown">Coffee Brown</option>
              <option value="Golden Yellow">Golden Yellow</option>
              <option value="Iris Lavender">Iris Lavender</option>
              <option value="Light Pink">Light Pink</option>
              <option value="Liril Green">Liril Green</option>
              <option value="Maroon">Maroon</option>
              <option value="Melange Grey">Melange Grey</option>
              <option value="Mustard Yellow">Mustard Yellow</option>
              <option value="Navy Blue">Navy Blue</option>
              <option value="Olive Green">Olive Green</option>
              <option value="Orange">Orange</option>
              <option value="Red">Red</option>
              <option value="Royal Blue">Royal Blue</option>
              <option value="Sky Blue">Sky Blue</option>
              <option value="White">White</option>
            </select>
            <br />
            <label htmlFor="size">T-Shirt Size:</label>
            <select
              id="size"
              name="tshirtSize"
              value={customerDetails.tshirtSize}
              onChange={handleInputChange}
              required
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="2XL">2XL</option>
              <option value="3XL">3XL</option>
              <option value="4XL">4XL</option>
              <option value="5XL">5XL</option>
            </select>
            <br />
            <button type="button" className={styles.homeButton} onClick={goToPreviousStage}>
            Previous
            </button>
            <button type="button" className={styles.homeButton} onClick={goToNextStage}>
              Next
            </button>
          </form>
          </div>
          )}

          {/* Stage 3: Other Details */}
          {currentStage === 3 && (

            <div className={styles.blueOutline}>
            <form>
            <h1  className={styles.userInfo}>Customer details : </h1>
            <label>
              Name:
              <input type="text" name="name" value={customerDetails.name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Address1:
              <input type="text" name="address1" value={customerDetails.address1} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Address2:
              <input type="text" name="address2" value={customerDetails.address2} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Address3:
              <input type="text" name="address3" value={customerDetails.address3} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Pincode:
              <input type="text" name="pincode" value={customerDetails.pincode} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              City:
              <input type="text" name="city" value={customerDetails.city} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Mobile Number:
              <input type="text" name="mobileNumber" value={customerDetails.mobileNumber} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Email:
              <input type="text" name="email" value={customerDetails.email} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              State:
              <input type="text" name="state" value={customerDetails.state} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Country:
              <input type="text" name="country" value={customerDetails.country} onChange={handleInputChange} />
            </label>
            <br />
            <button type="button" className={styles.homeButton} onClick={goToPreviousStage} >
            Previous
            </button>
            <button type="button" className={styles.homeButton} onClick={handleFormSubmit}>
              Submit
            </button>
          </form>
          </div>
          )}

          <br />

          {fileResponse && <pre>{JSON.stringify(fileResponse, null, 2)}</pre>}
          {formResponse && <pre>{JSON.stringify(formResponse, null, 2)}</pre>}
        </div>
    );
  };


export default App;


