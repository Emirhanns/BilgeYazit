const Categories = () => {
  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      <li className="bg-old-paper py-5 text-gray-800 cursor-pointer hover:bg-yellow-400 transition-all text-center min-w-[145px] border border-gray-300 rounded-md shadow-lg">
        <span>Tümü</span>
      </li>
      <li className="bg-old-paper py-5 text-gray-800 cursor-pointer hover:bg-yellow-400 transition-all text-center min-w-[145px] border border-gray-300 rounded-md shadow-lg">
        <span>Psikoloji</span>
      </li>
      <li className="bg-old-paper py-5 text-gray-800 cursor-pointer hover:bg-yellow-400 transition-all text-center min-w-[145px] border border-gray-300 rounded-md shadow-lg">
        <span>Edebiyat</span>
      </li>
      <li className="bg-old-paper py-5 text-gray-800 cursor-pointer hover:bg-yellow-400 transition-all text-center min-w-[145px] border border-gray-300 rounded-md shadow-lg">
        <span>Tarih</span>
      </li>
    </ul>
  );
};

export default Categories;
