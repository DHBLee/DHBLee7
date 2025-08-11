const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
