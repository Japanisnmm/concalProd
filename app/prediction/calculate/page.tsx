'use client'

import Navbar from "../../components/Navbar"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Define the ImageFile interface
interface ImageFile {
  url: string;
  name: string;
}

// Define enums for dropdown options
enum LightSourceOptions {
  SOURCE1 = 'source1',
  SOURCE2 = 'source2',
  SOURCE3 = 'source3',
}

enum SolventOptions {
  SOLVENT1 = 'solvent1',
  SOLVENT2 = 'solvent2',
  SOLVENT3 = 'solvent3',
}

enum SoluteOptions {
  SOLUTE1 = 'solute1',
  SOLUTE2 = 'solute2',
  SOLUTE3 = 'solute3',
}

// Dropdown component
const Dropdown = ({ label, value, onChange, options }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[] }) => (
  <div className="mb-4 w-full max-w-xs">
    <label className="block text-gray-700 mb-2">{label}</label>
    <select value={value} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const Calculate = () => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string>('');

  // State สำหรับ dropdown
  const [lightSource, setLightSource] = useState<string>('');
  const [solvent, setSolvent] = useState<string>('');
  const [solute1, setSolute1] = useState<string>('');
  const [solute2, setSolute2] = useState<string>('');

  useEffect(() => {
  
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ImageFile[] = [];
      Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
          setError('Please upload image files only');
          return;
        }
        const imageUrl = URL.createObjectURL(file);
        newImages.push({ url: imageUrl, name: file.name });
      });
      setSelectedImages(prev => [...prev, ...newImages]);
      setError('');
    }
  };

  const handleReset = () => {
    setSelectedImages([]);
    setLightSource('');
    setSolvent('');
    setSolute1('');
    setSolute2('');
  };

  const handlePredict = () => {
    if (!lightSource || !solvent || !solute1 || !solute2) {
      setError('Please select all parameters before predicting');
      return;
    }

    // สร้าง query parameters สำหรับส่งข้อมูล
    const queryParams = new URLSearchParams({
      lightSource,
      solvent,
      solute1,
      solute2,
      imageUrl: selectedImages.length > 0 ? selectedImages[selectedImages.length - 1].url : ''
    }).toString();

    // นำทางไปยังหน้า results พร้อมข้อมูล
    router.push(`/prediction/calculate/results?${queryParams}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-20">
        <div className="flex flex-col md:flex-row justify-start items-start gap-10">
          {/* ส่วนซ้าย - อัพโหลดรูปภาพ */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:ml-20">
            <div className="w-full max-w-sm aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4">
              {selectedImages.length > 0 ? (
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImages[selectedImages.length - 1].url}
                    alt="Latest selected image"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 mb-4">Upload your images here</p>
                  <p className="text-sm text-gray-400">Supported formats: PNG, JPEG, JPG</p>
                  <svg className="mx-auto h-12 w-12 text-gray-400 mt-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              multiple
            />
            <label
              htmlFor="image-upload"
              className="mt-4 px-6 py-2 bg-white border-2 border-black-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Add Images
            </label>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            
            {/* แสดงชื่อไฟล์ที่ถูกอัพโหลด */}
            {selectedImages.length > 0 && (
              <div className="mt-4 w-full max-w-sm">
                <h3 className="text-sm font-medium mb-2">Selected Images:</h3>
                <ul className="list-disc pl-5">
                  {selectedImages.map((image, index) => (
                    <li key={index} className="text-gray-700">{image.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ส่วนขวา - Dropdowns */}
          <div className="w-full md:w-2/3 flex flex-col items-center">
            <h1 className="font-normal text-6xl mb-10">Select Parameters</h1>

            <Dropdown
              label="Light Source"
              value={lightSource}
              onChange={(e) => setLightSource(e.target.value)}
              options={[
                { value: LightSourceOptions.SOURCE1, label: 'Source 1' },
                { value: LightSourceOptions.SOURCE2, label: 'Source 2' },
                { value: LightSourceOptions.SOURCE3, label: 'Source 3' },
              ]}
            />

            <Dropdown
              label="Solvent"
              value={solvent}
              onChange={(e) => setSolvent(e.target.value)}
              options={[
                { value: SolventOptions.SOLVENT1, label: 'Solvent 1' },
                { value: SolventOptions.SOLVENT2, label: 'Solvent 2' },
                { value: SolventOptions.SOLVENT3, label: 'Solvent 3' },
              ]}
            />

            <Dropdown
              label="Solute 1"
              value={solute1}
              onChange={(e) => setSolute1(e.target.value)}
              options={[
                { value: SoluteOptions.SOLUTE1, label: 'Solute 1' },
                { value: SoluteOptions.SOLUTE2, label: 'Solute 2' },
                { value: SoluteOptions.SOLUTE3, label: 'Solute 3' },
              ]}
            />

            <Dropdown
              label="Solute 2"
              value={solute2}
              onChange={(e) => setSolute2(e.target.value)}
              options={[
                { value: SoluteOptions.SOLUTE1, label: 'Solute 1' },
                { value: SoluteOptions.SOLUTE2, label: 'Solute 2' },
                { value: SoluteOptions.SOLUTE3, label: 'Solute 3' },
              ]}
            />

            {/* ปุ่ม Back, Reset, Predict */}
            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => router.push('/prediction')}
                className="px-6 py-2 bg-white border-2 border-black-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-white border-2 border-black-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={handlePredict}
                className="px-6 py-2 bg-white border-2 border-black-200 text-black rounded-lg hover:bg-blue-600 transition-colors"
              >
                Predict
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calculate