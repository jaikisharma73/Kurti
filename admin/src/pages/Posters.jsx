import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Posters = ({ token }) => {
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosters = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/poster/list');
      if (response.data.success) {
        setPosters(response.data.posters);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('description', description);

      const response = await axios.post(backendUrl + '/api/poster/add', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setImage(false);
        setTitle('');
        setSubtitle('');
        setDescription('');
        fetchPosters();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removePoster = async (id) => {
    if (!window.confirm('Are you sure you want to delete this poster?')) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/poster/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchPosters();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/poster/toggle-status',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchPosters();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-xl font-medium text-gray-700">Homepage Posters / Banners Management</p>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Form: Add Poster */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full lg:max-w-[400px] bg-white p-6 rounded border border-gray-200 shadow-sm">
          <p className="font-semibold text-gray-800 border-b pb-2 mb-2">Upload New Poster</p>

          <div className="w-full">
            <p className="mb-2 text-sm text-gray-600">Poster Image</p>
            <label htmlFor="image" className="cursor-pointer inline-block">
              <img
                className="w-32 h-20 object-cover border border-gray-300 rounded"
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt="Upload preview"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                accept="image/*"
                hidden
              />
            </label>
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-gray-600">Title / Main Heading</p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full border border-gray-300 px-3 py-2 text-sm rounded outline-none focus:border-black"
              type="text"
              placeholder="e.g. CRAFTED FOR THE MODERN YOU"
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-gray-600">Subtitle</p>
            <input
              onChange={(e) => setSubtitle(e.target.value)}
              value={subtitle}
              className="w-full border border-gray-300 px-3 py-2 text-sm rounded outline-none focus:border-black"
              type="text"
              placeholder="e.g. Premium Collection"
            />
          </div>

          <div className="w-full">
            <p className="mb-1 text-sm text-gray-600">Description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={3}
              className="w-full border border-gray-300 px-3 py-2 text-sm rounded outline-none focus:border-black resize-none"
              placeholder="Short paragraph describing style / fabric..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 text-sm font-medium hover:bg-neutral-800 disabled:bg-gray-400 transition-colors uppercase tracking-wider mt-2 cursor-pointer"
          >
            {loading ? 'Uploading...' : 'Add Poster'}
          </button>
        </form>

        {/* List: Existing Banners */}
        <div className="flex-1 w-full bg-white p-6 rounded border border-gray-200 shadow-sm">
          <p className="font-semibold text-gray-800 border-b pb-2 mb-4">Active Posters List</p>

          {posters.length === 0 ? (
            <p className="text-gray-500 text-sm py-6 text-center">No posters uploaded yet. They will fall back to default assets.</p>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="hidden sm:grid grid-cols-[2fr_3fr_1.5fr_1.5fr] items-center px-4 py-2 border bg-gray-50 text-xs font-semibold text-gray-700">
                <span>Preview</span>
                <span>Texts</span>
                <span className="text-center">Status</span>
                <span className="text-center">Action</span>
              </div>

              {posters.map((poster) => (
                <div key={poster._id} className="grid grid-cols-1 sm:grid-cols-[2fr_3fr_1.5fr_1.5fr] items-center gap-4 px-4 py-3 border rounded border-gray-200 text-sm">
                  <div>
                    <img className="w-28 h-16 object-cover border border-gray-300 rounded" src={poster.image} alt={poster.title} />
                  </div>
                  <div className="flex flex-col gap-1">
                    {poster.subtitle && <span className="text-xs text-neutral-500 font-medium tracking-wider uppercase">{poster.subtitle}</span>}
                    <span className="font-medium text-black">{poster.title || "No Title"}</span>
                    {poster.description && <p className="text-xs text-neutral-600 line-clamp-1">{poster.description}</p>}
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleStatus(poster._id)}
                      className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                        poster.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {poster.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => removePoster(poster._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posters;
