import React from "react";
import Header from "./Navbar";
import "./Homepage.css"
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
const Cards = ({state, country, town}) => {
  return (
    <div className="past-destination">
      <Card className="py-4 black custom-card" isHoverable
      css={{ padding: "$6", borderRadius: "$lg" }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{state}</p>
          <small className="text-default-500">{country}</small>
          <h4 className="font-bold text-large">{town}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="/home/naren-root/Documents/Semester 5/Travel-Planner/travel-planner/public/logo192.png"
            width={270}
          />
        </CardBody>
      </Card>
    </div>
  );
};

const Homepage = () => {
  return (
    <>
      <Header></Header>
      <div className="flex justify-center mt-8">
        <p className="font-bold text-2xl">Where to?</p>
      </div>

      <div className="flex justify-center items-center mt-8">
        <Input
          clearable
          placeholder="Places to go, things to do..."
          contentLeft={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 2a9 9 0 0 0 0 18 8.965 8.965 0 0 0 5.657-2.036l4.268 4.268a1 1 0 1 0 1.414-1.414l-4.268-4.268A8.965 8.965 0 0 0 20 11a9 9 0 1 0-9-9ZM4 11a7 7 0 1 1 7 7 7.008 7.008 0 0 1-7-7Z"
              />
            </svg>
          }
          className="w-96"
        />
        <Button color="primary" className="ml-4">
          Search
        </Button>
      </div>
      <div className="flex justify-center mt-8">
        <p className="font-bold text-2xl">Past Destinations</p>
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <Cards state = "Kerala" country="India" town="Vagamon"/>
        <Cards state = "Kerala" country="India" town="Varkala"/>
      </div>
    </>
  );
};

export default Homepage;
