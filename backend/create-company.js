const mongoose = require('mongoose');
require('dotenv').config();

async function createCompany() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Try to find Company model
        let Company;
        try {
            Company = mongoose.model('Company');
        } catch {
            // Create Company model if it doesn't exist
            const companySchema = new mongoose.Schema({
                companyName: String,
                description: String,
                createdAt: { type: Date, default: Date.now }
            });
            Company = mongoose.model('Company', companySchema);
        }
        
        // Create a company
        const company = await Company.create({
            companyName: "Test Electronics Inc",
            description: "Electronics supplier for students"
        });
        
        console.log('✅ Company created!');
        console.log('Company ID:', company._id);
        console.log('Company Name:', company.companyName);
        console.log('\n📝 Use this Company ID in your purchase request:');
        console.log(company._id);
        
        await mongoose.disconnect();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        // Try alternative - just use any ObjectId
        console.log('\n📝 Use this dummy Company ID for testing:');
        console.log('507f1f77bcf86cd799439011');
    }
}

createCompany();