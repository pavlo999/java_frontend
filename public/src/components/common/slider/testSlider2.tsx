import {  useEffect, useRef, useState } from "react";
import { APP_ENV } from "../../../env";
import'./style.css'

interface ISlideProps{
    imagesList:Array<string>,
}

const TestSlider2:React.FC<ISlideProps>= ({imagesList}) => {
const [activeIndex, setActiveIndex]  = useState<number>(0);
const timeOutRef = useRef<null | number>(null);

const delay: number = 4000;

const resetTimeOut = () => {
  if (timeOutRef.current) {
    clearTimeout(timeOutRef.current);
  }
};

useEffect(() => {
  
    resetTimeOut();
    timeOutRef.current =Number( setTimeout(
      () =>{
        setActiveIndex((prevIndex: number) =>
          prevIndex === imagesList.length - 1 ? 0 : prevIndex + 1
        )},
      delay
    ));

  return () => {
    resetTimeOut();
  };
}, [activeIndex , imagesList])


const handleArrowRight = () => {
  if (activeIndex === imagesList.length - 1) {
    setActiveIndex(0);
  } else setActiveIndex(activeIndex + 1);
};

const handleArrowLeft = () => {
  if (activeIndex ===0) {
    setActiveIndex(imagesList.length - 1);
  } else setActiveIndex(activeIndex - 1);
};

const imagePointList = imagesList.map((image,index) =>(
    <div key={index} id="image" 
        className={`slideDots overflow-hidden relative  ${
      activeIndex === index ? "active" : ""
    }`}
    onClick={() => setActiveIndex(index)}>
      <div className="image-slide-container">
      <img
            src={`${APP_ENV.REMOTE_HOST_NAME}files/600_${image}`}
            className=" picture-container"
            alt="" />
      </div>
        
    </div>
));

const contentList = imagesList.map((imgName, index) => (
  <div key={index} className="slide ">
    <div className="image-slide-container">
    <img
       src={`${APP_ENV.REMOTE_HOST_NAME}files/600_${imgName}`}
      className="picture-container rounded-md"
      alt="..."
    />
    </div>
  </div>
));

    return (
      <>
        {/*slider */}
        <div className="mySlider ">
          <div className=" relative slideVisible">
            <div
              className="slideContainer"
              style={{ transform: `translate3d(${-activeIndex * 100}%, 0, 0)` }}
            >
              {contentList}
            </div>

            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none leftArrow "
              onClick={handleArrowLeft}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-slate-300/40  dark:bg-gray-800/30 group-hover:bg-slate-300/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none rightArrow"
              onClick={handleArrowRight}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-slate-300/40 dark:bg-gray-800/30 group-hover:bg-slate-300/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
        {/* dots list */}
        <div className="slideDotsContainer">
              {imagePointList}
            </div>
      </>
    );
}

export default TestSlider2;