export function NavChat({ avatar, name }: { avatar: string; name: string }) {
  return (
    <div className="flex items-center p-4 bg-[#212121] border-b border-gray-700">
      {/* Avatar */}
      <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-700 rounded-full">
        {avatar}
      </div>

      {/* Name */}
      <div className="ml-4">
        <h3 className="text-white font-medium">{name}</h3>
      </div>
    </div>
  );
}
