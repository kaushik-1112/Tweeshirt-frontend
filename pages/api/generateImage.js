// pages/api/generateImage.js

import fetch from 'node-fetch';
// import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;
    const API_HOST = process.env.API_HOST || 'https://api.stability.ai';
    const apiKey = process.env.STABILITY_API_KEY_JEIS_2;
    const engineId1 = 'stable-diffusion-v1-6';
    const engineId2 = 'esrgan-v1-x2plus'
    const engineId3 = 'stable-diffusion-xl-1024-v0-9'
    const engineId4 = 'stable-diffusion-xl-1024-v1-0'
    const engineId5 = 'stable-diffusion-512-v2-1'
    const engineId6 = 'stable-diffusion-xl-beta-v2-2-2'

    if (!apiKey) {
      throw new Error('Missing Stability API key.');
    }

    const response = await fetch(`${API_HOST}/v1/generation/${engineId1}/text-to-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1,
          },
          {
            text: "blurry, bad, disfigured face, more teeth, more than 5 fingers",
            weight: -1,
          },
        ],
        height: 768,
        width: 1088,
        steps: 50,
        samples: 2,
      }),
    });

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }).replace(/[,:\s]/g, '_');
    

    const responseJSON = await response.json();
    const image_0 = responseJSON.artifacts[0].base64;
    const image_1 = responseJSON.artifacts[1].base64;
    // const image_2 = responseJSON.artifacts[2].base64;
    // const image_3 = responseJSON.artifacts[3].base64;

    // fs.writeFileSync(`public/gen_images/${prompt}_1_${timestamp}.png`, Buffer.from(image_0, 'base64'));
    // fs.writeFileSync(`public/gen_images/${prompt}_2_${timestamp}.png`, Buffer.from(image_1, 'base64'));
    // fs.writeFileSync(`public/gen_images/${prompt}_3_${timestamp}.png`, Buffer.from(image_2, 'base64'));
    // fs.writeFileSync(`public/gen_images/${prompt}_4_${timestamp}.png`, Buffer.from(image_3, 'base64'));

    res.status(200).json({ success: true, image_0 ,timestamp});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
