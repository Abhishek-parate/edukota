    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { addExam, getInst } from '../../api'; // Ensure getInst is imported
    import Swal from 'sweetalert2';

    const AddNewExam = () => {
    const navigate = useNavigate();

    const [examDetails, setExamDetails] = useState({
        name: '',
        class: '',
        insid: '',
        estatus: '0', // Default to 0 (Not Published)
        duration: '',
        tmarks: '',
        date: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        class: '',
        insid: '',
        estatus: '',
        duration: '',
        tmarks: '',
        date: '',
    });

    const [instOptions, setInstOptions] = useState([]);

    useEffect(() => {
        // Fetch inst options when component mounts
        const fetchInstOptions = async () => {
        try {
            const data = await getInst();
            setInstOptions(data.map(inst => ({ value: inst.id, label: inst.name }))); // Adjust according to actual API response
        } catch (error) {
            console.error('Failed to fetch inst options:', error);
        }
        };

        fetchInstOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamDetails(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
        name: '',
        class: '',
        insid: '',
        estatus: '',
        duration: '',
        tmarks: '',
        date: '',
        };

        Object.keys(examDetails).forEach((key) => {
        if (!examDetails[key].trim()) {
            newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
            valid = false;
        }
        });

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
        await addExam(examDetails);
        Swal.fire({
            title: 'Success',
            text: 'Exam added successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            navigate('/allexams'); // Navigate to the all exams page
        });
        } catch (error) {
        Swal.fire('Error', 'Failed to add exam.', 'error');
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
        <div className="card bg-base-100 p-6 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add New Exam</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Two items per row */}
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="font-semibold text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={examDetails.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter name"
                />
                {errors.name && <p className="text-red-600">{errors.name}</p>}
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="font-semibold text-gray-700">Class</label>
                <input
                    type="text"
                    name="class"
                    value={examDetails.class}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter class"
                />
                {errors.class && <p className="text-red-600">{errors.class}</p>}
                </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="font-semibold text-gray-700">Institution</label>
                <select
                    name="insid"
                    value={examDetails.insid}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                >
                    <option value="">Select institution</option>
                    {instOptions.map((inst) => (
                    <option key={inst.value} value={inst.value}>{inst.label}</option>
                    ))}
                </select>
                {errors.insid && <p className="text-red-600">{errors.insid}</p>}
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="font-semibold text-gray-700">Status</label>
                <select
                    name="estatus"
                    value={examDetails.estatus}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                >
                    <option value="0">Not Published</option>
                    <option value="1">Published</option>
                </select>
                {errors.estatus && <p className="text-red-600">{errors.estatus}</p>}
                </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="font-semibold text-gray-700">Duration (minutes)</label>
                <select
                    name="duration"
                    value={examDetails.duration}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                >
                    <option value="">Select duration</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                </select>
                {errors.duration && <p className="text-red-600">{errors.duration}</p>}
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="font-semibold text-gray-700">Total Marks</label>
                <input
                    type="number"
                    name="tmarks"
                    value={examDetails.tmarks}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter total marks"
                />
                {errors.tmarks && <p className="text-red-600">{errors.tmarks}</p>}
                </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="font-semibold text-gray-700">Date</label>
                <input
                    type="date"
                    name="date"
                    value={examDetails.date}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                {errors.date && <p className="text-red-600">{errors.date}</p>}
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                type="submit"
                className="btn btn-success text-white px-6 py-2 rounded-lg shadow-lg"
                >
                Add Exam
                </button>
                <button
                type="button"
                onClick={() => navigate('/admin/exam/')}
                className="btn btn-secondary px-6 py-2 rounded-lg shadow-lg"
                >
                Cancel
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default AddNewExam;
