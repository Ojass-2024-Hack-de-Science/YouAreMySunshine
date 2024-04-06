"use client";

import Image from "next/image";
import React, {useState} from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import axios from "axios";
import { Spotlight } from "@/components/ui/Spotlight";
import map from "../../../public/map2.png"
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { TypewriterEffectYourRoute } from "@/components/YourRoute";
export default function Junction() {
  const [data, setData] = useState('');
  const [result, setResult] = useState('');

  const handleDataChange = (e: any) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/', { data });
      `Junction ${response.data[0]}\nDate: ${new Date().toLocaleDateString()}\nTime: ${new Date().toLocaleTimeString()}`
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="flex flex-start flex-row flex-wrap dark:bg-black h-screen">
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
        <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border-none  ">
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <Image
            src={map}
            height="2000"
            width="2000"
            className="h-60 w-auto object-contain rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
    <div>
        <TypewriterEffectYourRoute/>
        <h2>Vehicle Route Optimizer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Data:
          <input type="text" value={data} onChange={handleDataChange} />
        </label>
        <br />
        <button type="submit">Optimize Route</button>
      </form>
      {result.length > 0 && (
        <div>
          <h3>Optimum Route</h3>
          <p>{result[0]}</p>
          <p>Date: {result[1]}</p>
          <p>Time: {result[2]}</p>
        </div>
      )}
        
    </div>
    </div>
  );
}
