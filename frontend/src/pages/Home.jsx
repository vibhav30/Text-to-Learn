import PromptForm from '../components/PromptForm';

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative isolate">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
      
      <div className="text-center mb-16 max-w-3xl mx-auto z-10 w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-xl">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider text-emerald-400">AI Powered Learning</span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 sm:mb-8 tracking-tight drop-shadow-sm leading-tight">
          Learn Anything,<br/>
          <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Instantly.</span>
        </h1>
        <p className="text-lg sm:text-2xl text-gray-400 font-light leading-relaxed mb-4">
          Provide any topic. We generate a comprehensive curriculum tailored precisely to you.
        </p>
      </div>

      <div className="w-full z-10">
        <PromptForm />
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
    </div>
  );
};

export default Home;
