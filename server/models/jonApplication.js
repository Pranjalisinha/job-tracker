import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        company:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            enum: ['applied', 'intervie', 'offer', 'rejected', 'cold'],
            default: 'applied',
        },
        appliedDate:{
            type: Date,
            default: Date.now,
        },
        lastUpdated:{
            type: Date,
            default: Date.now,
        },
        notes:{
            type: String,
        }
    },
    {timestamps: true}
);
export default mongoose.model('JobApplication', jobApplicationSchema);