export default function Button({ btnName, classStyles, handleClick }) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`nft-gradient text-sm minlg:text-lg py-2 px-6 cursor-pointer minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
    >
      {btnName}
    </button>
  );
}
