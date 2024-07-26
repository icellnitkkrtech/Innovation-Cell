import React from 'react';

function Glance() {
  return (
    <div className="bg-black min-h-screen w-full py-2">
      <h1 className="text-5xl md:text-7xl text-[#fe7189ea] text-center font-light leading-tight mb-10">INNOKSHETRA AT A GLANCE</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="https://media.canva.com/v2/image-resize/format:JPG/height:133/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FBeeFE%2FMAGKqfBeeFE%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAM2HK4a_nRtDEa8jMNwyB1Cj8Wcun0TdA4pLxv40Xepa&exp=1721841683&osig=AAAAAAAAAAAAAAAAAAAAANQZnzvn4Z5IY5SbmrK4o6Oam_4F68hkfbKAp6z6hWiC&signer=media-rpc&x-canva-quality=thumbnail" alt="Event Image 1" className="w-full h-48 object-cover" />
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
            <p className="text-base md:text-lg font-medium text-center">10000+ Footfalls<br/>3000+ Participants</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="https://img.jagranjosh.com/imported/images/E/Articles/nationalinstituteoftechnologykurukshetra.JPG" alt="Event Image 2" className="w-full h-48 object-cover" />
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
            <p className="text-base md:text-lg font-medium text-center">1,50,000+<br/>Alumni Network</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="https://media.canva.com/v2/image-resize/format:JPG/height:133/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FeRizo%2FMAGKqueRizo%2F1%2Fp.jpg/watermark:F/width:199?csig=AAAAAAAAAAAAAAAAAAAAACYDlQHfsSdz1cSB8NvBuAlnPbdexs6raoZbD5NZxNH2&exp=1721842233&osig=AAAAAAAAAAAAAAAAAAAAALcQ-HbpyghACNK07NjFBpVNwab6I0CS-IxGN-1Z4Xrd&signer=media-rpc&x-canva-quality=thumbnail" alt="Event Image 3" className="w-full h-48 object-cover" />
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
            <p className="text-base md:text-lg font-medium text-center">Publicity in over<br/>20+ colleges</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Glance;
