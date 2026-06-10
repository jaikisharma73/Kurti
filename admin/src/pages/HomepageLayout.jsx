import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const HomepageLayout = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Images state
  const [editorialBackdrop, setEditorialBackdrop] = useState(false);
  const [editorialBlock1, setEditorialBlock1] = useState(false);
  const [editorialBlock2, setEditorialBlock2] = useState(false);
  const [editorialBlock3, setEditorialBlock3] = useState(false);
  const [firstSplitLeft, setFirstSplitLeft] = useState(false);
  const [firstSplitRight, setFirstSplitRight] = useState(false);
  const [splitLeft, setSplitLeft] = useState(false);
  const [splitRight, setSplitRight] = useState(false);

  // Existing URLs
  const [urls, setUrls] = useState({});

  // Text/Link fields
  const [editorialBlock1Title, setEditorialBlock1Title] = useState('');
  const [editorialBlock1Text, setEditorialBlock1Text] = useState('');
  const [editorialBlock1Link, setEditorialBlock1Link] = useState('');
  const [editorialBlock2Title, setEditorialBlock2Title] = useState('');
  const [editorialBlock2Text, setEditorialBlock2Text] = useState('');
  const [editorialBlock2Link, setEditorialBlock2Link] = useState('');
  const [editorialBlock3Title, setEditorialBlock3Title] = useState('');
  const [editorialBlock3Text, setEditorialBlock3Text] = useState('');
  const [editorialBlock3Link, setEditorialBlock3Link] = useState('');

  const [firstSplitLeftPrice, setFirstSplitLeftPrice] = useState('');
  const [firstSplitLeftLink, setFirstSplitLeftLink] = useState('');
  const [firstSplitRightPrice, setFirstSplitRightPrice] = useState('');
  const [firstSplitRightLink, setFirstSplitRightLink] = useState('');
 
  const [splitLeftPrice, setSplitLeftPrice] = useState('');
  const [splitLeftLink, setSplitLeftLink] = useState('');
  const [splitRightPrice, setSplitRightPrice] = useState('');
  const [splitRightLink, setSplitRightLink] = useState('');

  const fetchConfig = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/homepage/get');
      if (response.data.success) {
        const config = response.data.config;
        setUrls({
          editorialBackdrop: config.editorialBackdrop || "",
          editorialBlock1: config.editorialBlock1 || "",
          editorialBlock2: config.editorialBlock2 || "",
          editorialBlock3: config.editorialBlock3 || "",
          firstSplitLeft: config.firstSplitLeft || "",
          firstSplitRight: config.firstSplitRight || "",
          splitLeft: config.splitLeft || "",
          splitRight: config.splitRight || "",
        });

        setEditorialBlock1Title(config.editorialBlock1Title || "MODERN ELEGANCE");
        setEditorialBlock1Text(config.editorialBlock1Text || "");
        setEditorialBlock1Link(config.editorialBlock1Link || "/collection");
        setEditorialBlock2Title(config.editorialBlock2Title || "THE NEW SILHOUETTE");
        setEditorialBlock2Text(config.editorialBlock2Text || "");
        setEditorialBlock2Link(config.editorialBlock2Link || "/collection");
        setEditorialBlock3Title(config.editorialBlock3Title || "REFINED TEXTURES");
        setEditorialBlock3Text(config.editorialBlock3Text || "");
        setEditorialBlock3Link(config.editorialBlock3Link || "/collection");

        setFirstSplitLeftPrice(config.firstSplitLeftPrice || "2999");
        setFirstSplitLeftLink(config.firstSplitLeftLink || "/collection");
        setFirstSplitRightPrice(config.firstSplitRightPrice || "2999");
        setFirstSplitRightLink(config.firstSplitRightLink || "/collection");
 
        setSplitLeftPrice(config.splitLeftPrice || "2999");
        setSplitLeftLink(config.splitLeftLink || "/collection");
        setSplitRightPrice(config.splitRightPrice || "2999");
        setSplitRightLink(config.splitRightLink || "/collection");
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load homepage layout config');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('editorialBlock1Title', editorialBlock1Title);
      formData.append('editorialBlock1Text', editorialBlock1Text);
      formData.append('editorialBlock1Link', editorialBlock1Link);
      formData.append('editorialBlock2Title', editorialBlock2Title);
      formData.append('editorialBlock2Text', editorialBlock2Text);
      formData.append('editorialBlock2Link', editorialBlock2Link);
      formData.append('editorialBlock3Title', editorialBlock3Title);
      formData.append('editorialBlock3Text', editorialBlock3Text);
      formData.append('editorialBlock3Link', editorialBlock3Link);

      formData.append('firstSplitLeftPrice', firstSplitLeftPrice);
      formData.append('firstSplitLeftLink', firstSplitLeftLink);
      formData.append('firstSplitRightPrice', firstSplitRightPrice);
      formData.append('firstSplitRightLink', firstSplitRightLink);
 
      formData.append('splitLeftPrice', splitLeftPrice);
      formData.append('splitLeftLink', splitLeftLink);
      formData.append('splitRightPrice', splitRightPrice);
      formData.append('splitRightLink', splitRightLink);
 
      // Append files if they are newly chosen
      editorialBackdrop && formData.append('editorialBackdrop', editorialBackdrop);
      editorialBlock1 && formData.append('editorialBlock1', editorialBlock1);
      editorialBlock2 && formData.append('editorialBlock2', editorialBlock2);
      editorialBlock3 && formData.append('editorialBlock3', editorialBlock3);
      firstSplitLeft && formData.append('firstSplitLeft', firstSplitLeft);
      firstSplitRight && formData.append('firstSplitRight', firstSplitRight);
      splitLeft && formData.append('splitLeft', splitLeft);
      splitRight && formData.append('splitRight', splitRight);

      const response = await axios.post(backendUrl + '/api/homepage/update', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchConfig();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  if (loading) {
    return <p className="text-gray-500 py-10">Loading homepage configuration...</p>;
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 w-full max-w-[900px]">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <p className="text-xl font-medium text-gray-700">Homepage Sections Layout Manager</p>
          <p className="text-sm text-gray-500">Configure promotional pictures, descriptions, titles, and split pricing details.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-8 py-3 rounded text-sm uppercase tracking-wider font-medium hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* SECTION 1: Editorial Section Backdrop */}
      <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col gap-4">
        <p className="font-semibold text-gray-800 text-lg border-b pb-2">1. Editorial Section Backdrop</p>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3">
            <p className="mb-2 text-sm text-gray-600">Backdrop Banner Image</p>
            <label htmlFor="editorialBackdrop" className="cursor-pointer inline-block">
              <img
                className="w-40 h-28 object-cover border border-gray-300 rounded hover:border-black transition-colors"
                src={editorialBackdrop ? URL.createObjectURL(editorialBackdrop) : (urls.editorialBackdrop || assets.upload_area)}
                alt="Backdrop preview"
              />
              <input
                onChange={(e) => setEditorialBackdrop(e.target.files[0])}
                type="file"
                id="editorialBackdrop"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="flex-grow flex flex-col justify-center h-full">
            <p className="text-sm text-gray-500 leading-relaxed">
              This is the full-screen backdrop picture displayed at the top of the Editorial Lookbook.
              Uploading a new picture will replace the default model look layout.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Editorial Row Blocks */}
      <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col gap-6">
        <p className="font-semibold text-gray-800 text-lg border-b pb-2">2. Editorial Lookbook Story Blocks</p>

        {/* Story Block 1 */}
        <div className="flex flex-col md:flex-row gap-6 border-b pb-6">
          <div className="w-full md:w-1/4">
            <p className="mb-2 text-sm font-medium text-gray-600">Story 1 Image</p>
            <label htmlFor="editorialBlock1" className="cursor-pointer inline-block">
              <img
                className="w-32 h-24 object-cover border border-gray-300 rounded hover:border-black transition-colors"
                src={editorialBlock1 ? URL.createObjectURL(editorialBlock1) : (urls.editorialBlock1 || assets.upload_area)}
                alt="Story 1 preview"
              />
              <input
                onChange={(e) => setEditorialBlock1(e.target.files[0])}
                type="file"
                id="editorialBlock1"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <input
              value={editorialBlock1Title}
              onChange={(e) => setEditorialBlock1Title(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm font-medium outline-none focus:border-black"
              type="text"
              placeholder="Title (e.g. MODERN ELEGANCE)"
            />
            <textarea
              value={editorialBlock1Text}
              onChange={(e) => setEditorialBlock1Text(e.target.value)}
              rows={2}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-black resize-none"
              placeholder="Paragraph text description..."
            />
            <input
              value={editorialBlock1Link}
              onChange={(e) => setEditorialBlock1Link(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-black"
              type="text"
              placeholder="Target Link (e.g. /product/6a0eec... or /collection)"
            />
          </div>
        </div>

        {/* Story Block 2 */}
        <div className="flex flex-col md:flex-row gap-6 border-b pb-6">
          <div className="w-full md:w-1/4">
            <p className="mb-2 text-sm font-medium text-gray-600">Story 2 Image</p>
            <label htmlFor="editorialBlock2" className="cursor-pointer inline-block">
              <img
                className="w-32 h-24 object-cover border border-gray-300 rounded hover:border-black transition-colors"
                src={editorialBlock2 ? URL.createObjectURL(editorialBlock2) : (urls.editorialBlock2 || assets.upload_area)}
                alt="Story 2 preview"
              />
              <input
                onChange={(e) => setEditorialBlock2(e.target.files[0])}
                type="file"
                id="editorialBlock2"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <input
              value={editorialBlock2Title}
              onChange={(e) => setEditorialBlock2Title(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm font-medium outline-none focus:border-black"
              type="text"
              placeholder="Title (e.g. THE NEW SILHOUETTE)"
            />
            <textarea
              value={editorialBlock2Text}
              onChange={(e) => setEditorialBlock2Text(e.target.value)}
              rows={2}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-black resize-none"
              placeholder="Paragraph text description..."
            />
            <input
              value={editorialBlock2Link}
              onChange={(e) => setEditorialBlock2Link(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-black"
              type="text"
              placeholder="Target Link (e.g. /product/6a0eec... or /collection)"
            />
          </div>
        </div>

        {/* Story Block 3 */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <p className="mb-2 text-sm font-medium text-gray-600">Story 3 Image</p>
            <label htmlFor="editorialBlock3" className="cursor-pointer inline-block">
              <img
                className="w-32 h-24 object-cover border border-gray-300 rounded hover:border-black transition-colors"
                src={editorialBlock3 ? URL.createObjectURL(editorialBlock3) : (urls.editorialBlock3 || assets.upload_area)}
                alt="Story 3 preview"
              />
              <input
                onChange={(e) => setEditorialBlock3(e.target.files[0])}
                type="file"
                id="editorialBlock3"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <input
              value={editorialBlock3Title}
              onChange={(e) => setEditorialBlock3Title(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm font-medium outline-none focus:border-black"
              type="text"
              placeholder="Title (e.g. REFINED TEXTURES)"
            />
            <textarea
              value={editorialBlock3Text}
              onChange={(e) => setEditorialBlock3Text(e.target.value)}
              rows={2}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-black resize-none"
              placeholder="Paragraph text description..."
            />
            <input
              value={editorialBlock3Link}
              onChange={(e) => setEditorialBlock3Link(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-black"
              type="text"
              placeholder="Target Link (e.g. /product/6a0eec... or /collection)"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: First Split Image Banners */}
      <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col gap-6">
        <p className="font-semibold text-gray-800 text-lg border-b pb-2">3. First Split Banners (SplitImageSection)</p>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Split */}
          <div className="flex flex-col gap-4 border-b md:border-b-0 pb-6 md:pb-0">
            <p className="text-sm font-semibold text-gray-700">Left Banner Side</p>
            <div className="flex gap-4">
              <label htmlFor="firstSplitLeft" className="cursor-pointer inline-block shrink-0">
                <img
                  className="w-24 h-36 object-cover border border-gray-300 rounded hover:border-black transition-colors"
                  src={firstSplitLeft ? URL.createObjectURL(firstSplitLeft) : (urls.firstSplitLeft || assets.upload_area)}
                  alt="Left banner preview"
                />
                <input
                  onChange={(e) => setFirstSplitLeft(e.target.files[0])}
                  type="file"
                  id="firstSplitLeft"
                  accept="image/*"
                  hidden
                />
              </label>
              <div className="flex-grow flex flex-col gap-2">
                <div>
                  <span className="text-xs text-gray-500">Banner Price tag:</span>
                  <input
                    value={firstSplitLeftPrice}
                    onChange={(e) => setFirstSplitLeftPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm mt-1 outline-none focus:border-black"
                    type="text"
                    placeholder="Price (e.g. 2999)"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Banner Product Link:</span>
                  <input
                    value={firstSplitLeftLink}
                    onChange={(e) => setFirstSplitLeftLink(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm mt-1 outline-none focus:border-black"
                    type="text"
                    placeholder="e.g. /product/6a0eec..."
                  />
                </div>
              </div>
            </div>
          </div>
 
          {/* Right Split */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-700">Right Banner Side</p>
            <div className="flex gap-4">
              <label htmlFor="firstSplitRight" className="cursor-pointer inline-block shrink-0">
                <img
                  className="w-24 h-36 object-cover border border-gray-300 rounded hover:border-black transition-colors"
                  src={firstSplitRight ? URL.createObjectURL(firstSplitRight) : (urls.firstSplitRight || assets.upload_area)}
                  alt="Right banner preview"
                />
                <input
                  onChange={(e) => setFirstSplitRight(e.target.files[0])}
                  type="file"
                  id="firstSplitRight"
                  accept="image/*"
                  hidden
                />
              </label>
              <div className="flex-grow flex flex-col gap-2">
                <div>
                  <span className="text-xs text-gray-500">Banner Price tag:</span>
                  <input
                    value={firstSplitRightPrice}
                    onChange={(e) => setFirstSplitRightPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm mt-1 outline-none focus:border-black"
                    type="text"
                    placeholder="Price (e.g. 2999)"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Banner Product Link:</span>
                  <input
                    value={firstSplitRightLink}
                    onChange={(e) => setFirstSplitRightLink(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm mt-1 outline-none focus:border-black"
                    type="text"
                    placeholder="e.g. /product/6a0eec..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* SECTION 4: Split Image Banners 2 */}
      <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col gap-6">
        <p className="font-semibold text-gray-800 text-lg border-b pb-2">4. Second Split Banners (SplitImageSection2)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Split */}
          <div className="flex flex-col gap-4 border-b md:border-b-0 pb-6 md:pb-0">
            <p className="text-sm font-semibold text-gray-700">Left Banner Side</p>
            <div className="flex gap-4">
              <label htmlFor="splitLeft" className="cursor-pointer inline-block shrink-0">
                <img
                  className="w-24 h-36 object-cover border border-gray-300 rounded hover:border-black transition-colors"
                  src={splitLeft ? URL.createObjectURL(splitLeft) : (urls.splitLeft || assets.upload_area)}
                  alt="Left banner preview"
                />
                <input
                  onChange={(e) => setSplitLeft(e.target.files[0])}
                  type="file"
                  id="splitLeft"
                  accept="image/*"
                  hidden
                />
              </label>
              <div className="flex-grow flex flex-col gap-2">
                <div>
                  <span className="text-xs text-gray-500">Banner Price tag:</span>
                  <input
                    value={splitLeftPrice}
                    onChange={(e) => setSplitLeftPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm mt-1 outline-none focus:border-black"
                    type="text"
                    placeholder="Price (e.g. 2999)"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Banner Product Link:</span>
                  <input
                    value={splitLeftLink}
                    onChange={(e) => setSplitLeftLink(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm mt-1 outline-none focus:border-black"
                    type="text"
                    placeholder="e.g. /product/6a0eec..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Split */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-700">Right Banner Side</p>
            <div className="flex gap-4">
              <label htmlFor="splitRight" className="cursor-pointer inline-block shrink-0">
                <img
                  className="w-24 h-36 object-cover border border-gray-300 rounded hover:border-black transition-colors"
                  src={splitRight ? URL.createObjectURL(splitRight) : (urls.splitRight || assets.upload_area)}
                  alt="Right banner preview"
                />
                <input
                  onChange={(e) => setSplitRight(e.target.files[0])}
                  type="file"
                  id="splitRight"
                  accept="image/*"
                  hidden
                />
              </label>
              <div className="flex-grow flex flex-col gap-2">
                <div>
                  <span className="text-xs text-gray-500">Banner Price tag:</span>
                  <input
                    value={splitRightPrice}
                    onChange={(e) => setSplitRightPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm mt-1 outline-none focus:border-black"
                    type="text"
                    placeholder="Price (e.g. 2999)"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Banner Product Link:</span>
                  <input
                    value={splitRightLink}
                    onChange={(e) => setSplitRightLink(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm mt-1 outline-none focus:border-black"
                    type="text"
                    placeholder="e.g. /product/6a0eec..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HomepageLayout;
