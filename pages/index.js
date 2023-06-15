"use client"
import React, { useCallback, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  withPageAuthRequired
} from '@auth0/nextjs-auth0';


async function getSignedUrl() {
  const res = await fetch("https://fks4jtea2mb37x7j7cvbapngle0pltjy.lambda-url.ap-south-1.on.aws/");
  const jsonRes = await res.json();
  return jsonRes.uploadURL
}


export default function Home() {
  const { user } = useUser()
  const [file, setfile] = useState(null);

  const onFileChange = useCallback((e) => {
    setfile(e.target.files[0]);
  }, [])

  const onSubmit = useCallback(async () => {
    const uploadURL = await getSignedUrl()
    console.log('uploadURL :>> ', uploadURL);
    fetch(uploadURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: file
    })
  }, [file])

  return (
    <div>
      <input type='file' onChange={onFileChange} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}

// export const getServerSideProps  = withPageAuthRequired();