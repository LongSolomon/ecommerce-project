import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import RacketModel from '../components/RacketModel';

const Customization = () => {
  const [step, setStep] = useState(1);
  const [configuration, setConfiguration] = useState({
    stringTension: 24,
    frameModel: '',
    stringOption: '',
    stringColor: 'black',
    frameColor: 'black',
    longColor: 'black',
    handleOption: '',
    handleColor: 'black',
    stringDecal: null,
  });
  const [price, setPrice] = useState(300);

  const fileInputRef = useRef(null);
  const stringColors = ['white', 'black', '#f5e105', 'red', 'blue'];
  const gripColors = ['black', 'white', 'red', 'blue', 'green', '#f5e105'];

  // Hard-coded options for demonstration purposes
  const frameModels = [
    {
      id: 1,
      name: 'Yonex Nanoflare 1000Z',
      image: '/nanoflare-1000-z-1.webp',
      price: 200.0,
    },
    {
      id: 2,
      name: 'Li-ning Axforce Cannon',
      image: '/axforce.jpg',
      price: 150,
    },
    { id: 3, name: 'Yonex Astrox 1DG', image: '/astrox.webp', price: 250 },
  ];

  const stringOptions = [
    {
      id: 4,
      name: 'Yonex EXBOLT 63',
      image: '/yonex-string.webp',
      price: 30,
    },
    {
      id: 5,
      name: 'Li-ning AP66 Turbo',
      image: '/lining-string.jpg',
      price: 40,
    },
  ];

  const handleOptions = [
    {
      id: 7,
      name: 'Li-ning GP1000 AXSF002',
      image: '/grip.webp',
      price: 20,
    },
    { id: 8, name: 'Yonex Tech 501B', image: '/yonex-grip.jpg', price: 25 },
  ];

  const updateConfiguration = (key, value, id) => {
    setConfiguration((prev) => {
      let newConfig = { ...prev, [key]: value };
      if (key === 'frameModel') {
        if (id === 1) {
          newConfig = {
            ...newConfig,
            frameColor: 'black',
            handleColor: '#f5e105',
            longColor: '#f5e105',
            stringColor: 'white',
          };
        } else if (id === 2) {
          newConfig = {
            ...newConfig,
            frameColor: 'black',
            longColor: 'black',
            handleColor: 'white',
            stringColor: 'white',
          };
        } else if (id === 3) {
          newConfig = {
            ...newConfig,
            frameColor: '#40b0ff',
            longColor: '#40b0ff',
            handleColor: 'black',
            stringColor: 'white',
          };
        }
      }
      return newConfig;
    });

    let newPrice = 199.99;
    if (key === 'frameModel') {
      const selectedFrame = frameModels.find((model) => model.name === value);
      if (selectedFrame) newPrice = selectedFrame.price;
    }
    if (key === 'stringOption') {
      const selectedString = stringOptions.find(
        (option) => option.name === value
      );
      if (selectedString) newPrice += selectedString.price;
    }
    if (key === 'handleOption') {
      const selectedHandle = handleOptions.find(
        (option) => option.name === value
      );
      if (selectedHandle) newPrice += selectedHandle.price;
    }
    if (key === 'stringDecal' && value) newPrice += 15;
    setPrice(newPrice);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        updateConfiguration('stringDecal', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderOptionCards = (options, selectedOption, updateKey) => {
    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {options.map((option) => (
          <div
            key={option.name}
            className={`cursor-pointer border rounded-lg p-4 ${
              configuration[updateKey] === option.name
                ? 'border-blue-500'
                : 'border-gray-300'
            }`}
            onClick={() =>
              updateConfiguration(updateKey, option.name, option.id)
            }
          >
            <img
              src={option.image}
              alt={option.name}
              className={`w-full h-40 object-cover mb-2 ${
                updateKey === 'frameModel' ? 'object-top' : ''
              }`}
            />
            <h4 className='font-semibold'>{option.name}</h4>
            <p className='text-sm text-gray-600'>${option.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderColorOptions = (colors, selectedColor, updateKey) => {
    return (
      <div className='flex flex-wrap gap-2 justify-center'>
        {colors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full ${
              configuration[updateKey] === color
                ? 'ring-2 ring-blue-500'
                : 'border border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => updateConfiguration(updateKey, color)}
          />
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium'>Frame Model</h3>
            {renderOptionCards(
              frameModels,
              configuration.frameModel,
              'frameModel'
            )}
          </div>
        );
      case 2:
        return (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium'>String Option</h3>
            {renderOptionCards(
              stringOptions,
              configuration.stringOption,
              'stringOption'
            )}
            <h3 className='text-lg font-medium mt-6'>String Color</h3>
            {renderColorOptions(
              stringColors,
              configuration.stringColor,
              'stringColor'
            )}
            <h3 className='text-lg font-medium mt-6'>String Tension</h3>
            <input
              type='range'
              min={20}
              max={30}
              step={0.5}
              value={configuration.stringTension}
              onChange={(e) =>
                updateConfiguration('stringTension', parseFloat(e.target.value))
              }
              className='w-full accent-blue-900'
            />
            <p className='text-sm text-gray-500'>
              Current tension: {configuration.stringTension}lbs
            </p>
            <div className='mt-4'>
              <h3 className='text-lg font-medium mb-2'>String Decal</h3>
              <div className='flex items-center gap-4'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileUpload}
                  className='hidden'
                  ref={fileInputRef}
                  id='string-decal-upload'
                />
                <label htmlFor='string-decal-upload' className='cursor-pointer'>
                  <button
                    className='flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900/90'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Decal
                  </button>
                </label>
                {configuration.stringDecal && (
                  <img
                    src={configuration.stringDecal}
                    alt='String Decal'
                    className='w-12 h-12 object-cover rounded-md'
                  />
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium'>Handle Option</h3>
            {renderOptionCards(
              handleOptions,
              configuration.handleOption,
              'handleOption'
            )}
            <h3 className='text-lg font-medium mt-6'>Grip Color</h3>
            {renderColorOptions(
              gripColors,
              configuration.handleColor,
              'handleColor'
            )}
          </div>
        );
      case 4:
        return (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium'>Summary</h3>
            <div className='grid grid-cols-2 gap-2'>
              <p>Frame Model:</p>
              <p>{configuration.frameModel}</p>
              <p>String Option:</p>
              <p>{configuration.stringOption}</p>
              <p>String Color:</p>
              <p>{configuration.stringColor}</p>
              <p>String Tension:</p>
              <p>{configuration.stringTension}lbs</p>
              <p>Handle Option:</p>
              <p>{configuration.handleOption}</p>
              <p>Grip Color:</p>
              <p>{configuration.handleColor}</p>
              {configuration.stringDecal && (
                <>
                  <p>Custom String Decal:</p>
                  <p>Added</p>
                </>
              )}
            </div>
            <p className='text-xl font-bold mt-4'>
              Total Price: ${price.toFixed(2)}
            </p>
            <button
              className='w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900/90'
              onClick={() => alert('Order placed!')}
            >
              Add to Cart
            </button>
          </div>
        );
    }
  };

  return (
    <div className='flex flex-col lg:flex-row gap-8 min-h-screen p-8 w-7xl'>
      <div className='w-full lg:w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>Build Your Perfect Racket</h2>
        <div className='bg-white shadow-md rounded-lg p-6'>
          {renderStep()}
          <div className='flex justify-between mt-6'>
            <button
              className='flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50'
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              className='flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-600/90 disabled:opacity-50'
              onClick={() => setStep((prev) => Math.min(4, prev + 1))}
              disabled={step === 4}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-1/2'>
        <h2 className='text-2xl font-bold mb-4'>3D Preview</h2>
        <div className='bg-white shadow-md rounded-lg p-2 sm:p-6 h-[80vh] max-h-screen'>
          <RacketVisualizer configuration={configuration} />
        </div>
      </div>
    </div>
  );
};

const RacketVisualizer = ({ configuration }) => {
  const [rotating] = useState(false);
  const [zoom] = useState(1);

  return (
    <Canvas
      shadows
      camera={{ position: [5, 20, 0], zoom, fov: 50 }}
      className='h-[500px] w-[500px] bg-neutral-700'
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} castShadow />
      <OrbitControls makeDefault />
      <RacketModel configuration={configuration} rotating={rotating} />
    </Canvas>
  );
};

export default Customization;
