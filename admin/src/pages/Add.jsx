import { useState } from "react";
import { assets } from "../assets/assets"
import axios from "axios"
import { backendURL } from "../App";
import { toast } from "react-toastify";


const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestSeller', bestSeller);

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const res = await axios.post(`${backendURL}/api/product/add`, formData, {
        headers: { token }
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={onSubmitHandler}>
      <div>
        <p className="mb-2">
          Upload Image
        </p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload" />
          </label>
          <input type="file" id="image1" className="hidden" onChange={(e) => setImage1(e.target.files[0])} />
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload" />
          </label>
          <input type="file" id="image2" className="hidden" onChange={(e) => setImage2(e.target.files[0])} />
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload" />
          </label>
          <input type="file" id="image3" className="hidden" onChange={(e) => setImage3(e.target.files[0])} />
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload" />
          </label>
          <input type="file" id="image4" className="hidden" onChange={(e) => setImage4(e.target.files[0])} />
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">
          Product Name
        </p>
        <input className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="w-full">
        <p className="mb-2">
          Product Description
        </p>
        <textarea className="w-full max-w-[500px] px-3 py-2" placeholder="Product Description" required value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">
            Product Category
          </p>
          <select className="w-full px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">
            Sub Category
          </p>
          <select className="w-full px-3 py-2" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">
            Product Price
          </p>
          <input className="w-full sm:w-[120px] px-3 py-2" type="number" placeholder="Product Price" required value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
      </div>

      <div>
        <p className="mb-2">
          Product Sizes
        </p>
        <div className="flex gap-3">
          <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])}>
            <p className={`${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])}>
            <p className={`${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])}>
            <p className={`${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])}>
            <p className={`${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])}>
            <p className={`${sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" checked={bestSeller} onChange={() => setBestSeller(prev => !prev)} />
        <label htmlFor="bestseller" className="cursor-pointer">Add to bestseller</label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">ADD</button>
    </form>
  )
}

export default Add