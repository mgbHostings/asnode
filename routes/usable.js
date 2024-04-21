const express = require('express');
const usableRoutes = express.Router();
const { titles, genders, branch, compans, addressMaster, departments, units,
    clientInfos, createteams, CountryModel, generateLoans, permissionss
    , loanApprovalsPermissiones, paymentsTables, productsTableDatas } = require('../dbmodels/usables');
const cryptos = require('../utilities/cryptos');
const userModels = require('../dbmodels/users');
const mongoose = require('mongoose');
const fs = require('fs');
const approot = require('app-root-path');
let upload = 'fileupload';
const _ = require('lodash');
const bodyParser = require('body-parser');
const jsonpsrder = bodyParser.json({ limit: '100kb' })
const uploaddir = `${approot}/${upload}`;
if (!fs.existsSync(uploaddir)) {
    fs.mkdirSync(uploaddir);
};
usableRoutes.post('/pagepermissionslist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {

        let filteredResults = [];
        let pagepermissions = await permissionss.find({}).then((results) =>
            filteredResults = results.filter((filter, filterIn) => !['DA'].includes(filter['code']))
        );
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = filteredResults;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/onlypages', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let pagepermissions = await permissionss.find({ code: req.body.secure['code'] });
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = pagepermissions;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/updatepermissions', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", DATA: [] };

    try {
        let pagePermissionsUpdate = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;

        if (!Array.isArray(pagePermissionsUpdate) || pagePermissionsUpdate.length === 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
        } else {


            for (const item of pagePermissionsUpdate) {
                try {
                    for (const module of item.modules) {
                        const updatedDocument = await permissionss.findOneAndUpdate(
                            { cader: item.cader, 'modules.name': module.name },
                            { $set: { 'modules.$.isCanDo': module.isCanDo } },
                            { new: true }
                        );

                        if (updatedDocument) {
                            // console.log('Updated document:', updatedDocument);
                        } else {
                            // console.log('Document not found');
                        }
                    }
                } catch (error) {
                    // console.error('Error updating document:', error);
                }
            }

            texts['S_CODE'] = 200;
            texts['S_MSG'] = `Updated Page Permissions Successfully`;
        }
    } catch (e) {
        // console.error(e);
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
    }

    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

// company start
usableRoutes.post('/companylist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getCompanies = [];
        let isDrop = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        let companiesList = [];
        if (Object.keys(isDrop).length > 0 && isDrop['filter'] == 'Drop') {
            await compans.find({}).sort({ create_dt: -1 }).then(async (res) =>
                res.forEach(async (allCompanies, comIn) => {
                    let createCmp = {
                        id: allCompanies._id,
                        cname: allCompanies.cname,
                        branchCount: 0
                    };
                    companiesList.push(createCmp);
                })
            );
            const updatedCompaniesList = await Promise.all(companiesList.map(async (coms) => {
                coms['branchCount'] = await branch.countDocuments({ cId: { $eq: coms.id } });
                return coms;
            }));

            texts['DATA'] = updatedCompaniesList;
        } else {
            getCompanies = await compans.find({}).sort({ create_dt: -1 });
            texts['DATA'] = getCompanies;
        };
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/create-company', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let companyPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        if (Object.keys(companyPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            if (companyPayload.flag == 'S') { // CREATE
                delete companyPayload.id;
                let createCompany = await compans.create(companyPayload);
                await createCompany.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (companyPayload.flag == 'E') {
                let bEdit = await compans.findOne({ _id: companyPayload.id });
                bEdit.cname = companyPayload.cname;
                bEdit.ccode = companyPayload.ccode;
                bEdit.cLogo = companyPayload.cLogo;
                bEdit.cadress = companyPayload.cadress;

                bEdit.countryname = companyPayload.countryname;
                bEdit.state = companyPayload.state;
                bEdit.cityname = companyPayload.cityname;
                bEdit.city = companyPayload.city;

                bEdit.decs = companyPayload.decs;
                bEdit.active = companyPayload.active;
                await bEdit.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            }
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${companyPayload.flag == 'E' ? 'Edited' : 'Created'} a Company Successfully`;
            texts['DATA'] = [];
        };
    } catch (e) {
        // console.log(e)
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// company end

// gender start
usableRoutes.post('/genderlist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getGenders = await genders.find({});
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getGenders;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);

});

usableRoutes.post('/create-gender', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let genderPayload = cryptos.decrypt(req.body.secure);
        if (Object.keys(genderPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (genderPayload.flag == 'S') { // CREATE
                let createGenders = await genders.create(genderPayload);
                await createGenders.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (genderPayload.flag == 'E') {

            }
        };


    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// gender end

// address start
usableRoutes.post('/create-address-master', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let addressPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(addressPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (addressPayload.flag == 'S') { // CREATE
                let createCompany = await addressMaster.create(addressPayload);
                await createCompany.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (addressPayload.flag == 'E') {

            };
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// address end

// branch start
usableRoutes.post('/branchlist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        // let getBranches = [];
        let isDrop = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        let branchesList = [];
        if (Object.keys(isDrop).length > 0 && isDrop['filter'] == 'Drop') {
            // create_by :  isDrop['create_by']
            await branch.find({ active: true }).sort({ create_dt: -1 }).then(async (res) =>
                res.forEach(async (allBranches, comIn) => {
                    let createCmp = {
                        id: allBranches._id,
                        bname: allBranches.bname,
                        bcode: allBranches.bcode,
                        clientCount: 0
                    };
                    branchesList.push(createCmp);
                })
            );
            const updatedbranchesList = await Promise.all(branchesList.map(async (coms) => {
                coms['clientCount'] = await generateLoans.countDocuments({ branch: { $eq: coms.id } });
                return coms;
            }));

            texts['DATA'] = updatedbranchesList;
        } else {
            let getBranches = await branch.find({}).sort({ bcode: -1 }) //.sort({ bname: 1, cname: -1 });
            texts['DATA'] = getBranches;
        };
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };

    // try {
    //     let getBranches = await branch.find({}).sort({ create_dt: -1 }) //.sort({ bname: 1, cname: -1 });
    //     texts['S_CODE'] = 200;
    //     texts['S_MSG'] = "SUCCESS";
    //     texts['DATA'] = getBranches;
    // } catch (e) {
    //     texts['S_CODE'] = 400;
    //     texts['S_MSG'] = "SERVER ERROR";
    //     texts['DATA'] = [];
    // };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/create-branch', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let branchPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(branchPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            if (branchPayload.flag == 'E') { // CREATE
                let bEdit = await branch.findOne({ _id: branchPayload.id });
                bEdit.bname = branchPayload.bname;
                bEdit.bcode = branchPayload.bcode;
                bEdit.desc = branchPayload.desc;
                bEdit.b_opn_dt = branchPayload.b_opn_dt;
                bEdit.cId = branchPayload.cId;

                bEdit.pincode = branchPayload.pincode;
                bEdit.contact_no = branchPayload.contact_no;
                bEdit.active = branchPayload.active;


                bEdit.countryname = branchPayload.countryname;
                bEdit.state = branchPayload.state;
                bEdit.cityname = branchPayload.cityname;
                bEdit.city = branchPayload.city;

                await bEdit.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (branchPayload.flag == 'S') {

                delete branchPayload.id;
                let c = await compans.findById({ _id: branchPayload.cId });
                branchPayload['cname'] = c.cname;

                let createBranch = await branch.create(branchPayload);
                await createBranch.save();
            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${branchPayload.flag == 'E' ? 'Edited' : 'Created'} a Branch Successfully`;
            texts['DATA'] = [];
        };
    } catch (e) {
        // console.log(e)
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// branch end

// department start
usableRoutes.post('/departmentlist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getDepartment = await departments.find({});
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getDepartment;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});


usableRoutes.post('/gnloanslist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let loandPaylod = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        let genLoansList = await generateLoans.find({}).sort({ create_dt: -1 });
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = genLoansList;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
usableRoutes.post('/create-department', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let departmentPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(departmentPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (departmentPayload.flag == 'S') { // CREATE
                let createGenders = await departments.create(departmentPayload);
                await createGenders.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (departmentPayload.flag == 'E') {

            }
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// department end

// title start
usableRoutes.post('/titlelist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getTitles = await titles.find({});
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getTitles;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/create-title', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let titlePayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(titlePayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (titlePayload.flag == 'S') { // CREATE
                let createGenders = await titles.create(titlePayload);
                await createGenders.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (titlePayload.flag == 'E') {

            }
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// title end

// units start
usableRoutes.post('/unitslist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getUnits = await units.find({});
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getUnits;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/create-units', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let unitsPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;// cryptos.decrypt(req.body.secure);
        if (Object.keys(unitsPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (unitsPayload.flag == 'S') { // CREATE
                let createGenders = await titles.create(unitsPayload);
                await createGenders.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (unitsPayload.flag == 'E') {

            }
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// units end

// term start
usableRoutes.post('/termlist', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getUnits = await units.find({});
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getUnits;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/create-term', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let unitsPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;// cryptos.decrypt(req.body.secure);
        if (Object.keys(unitsPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (unitsPayload.flag == 'S') { // CREATE
                let createGenders = await titles.create(unitsPayload);
                await createGenders.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (unitsPayload.flag == 'E') {

            }
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// term end

// page permissions start

usableRoutes.post('/create-pagepermission', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let unitsPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(unitsPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (unitsPayload.flag == 'S') { // CREATE
                let createGenders = await titles.create(unitsPayload);
                await createGenders.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (unitsPayload.flag == 'E') {

            }
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

// page permissions end

usableRoutes.post('/getOnlyCreatedBorrowers', async (req, res) => {
    let createUserPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        // let findUserInDb = { create_by: createUserPayload['create_by'] };
        let isUserNameExists = await clientInfos.find({ create_by: createUserPayload['create_by'] }).select('_id name').exec(); //, '_id name'
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = isUserNameExists;
    } catch (e) {
        // console.log(e)
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

// borrower start
usableRoutes.post('/borrowerlist', async (req, res) => {
    let createUserPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let clientJoiningData = [];
        // console.log("createUserPayload['create_by']", createUserPayload['create_by']);
        await clientInfos.find({}).sort({ create_dt: -1 }).then(
            results => {
                let filterMemberAgainstThose = [];
                filterMemberAgainstThose = results.filter((fil, filIn) =>
                    fil.byemployee == createUserPayload['create_by']);
                if (filterMemberAgainstThose.length > 0) {
                    filterMemberAgainstThose.forEach(async (getUsers, userIn) => {
                        let createP = {
                            id: getUsers.id,
                            branch_id: getUsers.branch_id,
                            branch_name: getUsers.branch_name,
                            name: getUsers.name,
                            aadhar: getUsers.aadhar,
                            ccode: getUsers.ccode,
                            description: getUsers.description,
                            contact_no: getUsers.contact_no,
                            countryname: getUsers.countryname,
                            state: getUsers.state,
                            cityname: getUsers.cityname,
                            city: getUsers.city,
                            pincode: getUsers.pincode,
                            byemployee: getUsers.byemployee,
                            byemployeename: getUsers.byemployeename,
                            active: getUsers.active,
                            A: getUsers.A,
                            RC: getUsers.RC,
                            HTR: getUsers.HTR,
                            LA: getUsers.LA,
                            HP: getUsers.HP,
                            PPC: getUsers.PPC,
                            OTHERS: getUsers.OTHERS
                        };
                        // let path

                        // if (getUsers['A']) {
                        //     // console.log(getUsers['A'], 'kgg')
                        //     let as = getUsers['A'].split('fileupload/')[1];
                        //     if (fs.existsSync(getUsers['A'])) {
                        //         const uploaddir = `${approot}/${upload}`;
                        //         console.log(getUsers['A'], 'uhukbibi')
                        //         let url = _.replace(getUsers['A'], uploaddir, 'http://localhost:2300');
                        //         console.log(url, 'setfile')
                        //         getUsers['url'] = url;
                        //     };
                        // };
                        // if (getUsers['A']) {
                        //     console.log(getUsers['A'], 'kgg');
                        //     const uploaddir = `${approot}/${upload}`;
                        //     const filename = getUsers['A'].split('fileupload/')[1];

                        //     if (fs.existsSync(getUsers['A'])) {
                        //         let url = `http://localhost:2300/sml/sml-node-app-main/fileupload/${filename}`;
                        //         console.log(url, 'setfile');
                        //         getUsers['A'] = url;
                        //     }
                        // }


                        clientJoiningData.push(createP);
                    });
                }
            }
        );
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = clientJoiningData;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/create-borrower', jsonpsrder, async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let clientInfosPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(clientInfosPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            // let company = await branch.findOne({ _id: clientInfosPayload.branch_id });
            // clientInfosPayload['branch_name'] = company.bname;
            // console.log(clientInfosPayload['A']['name'])
            // const clientInfoA = clientInfosPayload['A']['name'];
            // const timestamp = Date.now();
            // const fileName = clientInfoA;
            // const newpath = `${uploaddir}/${timestamp}-${fileName}`;
            // fs.writeFileSync(newpath, clientInfoA);
            // clientInfosPayload.A = null;
            // clientInfosPayload.A = newpath;

            //  clientInfosPayload.RC = clientInfosPayload.A['file_folder'] =newpath
            // clientInfosPayload.HTR = clientInfosPayload.A['file_folder']
            // clientInfosPayload.LA = clientInfosPayload.A['file_folder']
            // clientInfosPayload.HP = clientInfosPayload.A['file_folder']
            // clientInfosPayload.PPC = clientInfosPayload.A['file_folder']
            // clientInfosPayload.OTHERS = clientInfosPayload.A['file_folder']

            // return;
            if (clientInfosPayload.flag == 'S') { // CREATE
                delete clientInfosPayload.id;
                let createBorrower = await clientInfos.create(clientInfosPayload);
                await createBorrower.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (clientInfosPayload.flag == 'E') {
                let bEdit = await clientInfos.findOne({ _id: clientInfosPayload.id });
                bEdit.name = clientInfosPayload.name;
                bEdit.aadhar = clientInfosPayload.aadhar;
                bEdit.ccode = clientInfosPayload.ccode;
                bEdit.contact_no = clientInfosPayload.contact_no;
                bEdit.description = clientInfosPayload.description;
                bEdit.branch_id = clientInfosPayload.branch_id;
                bEdit.branch_name = clientInfosPayload.branch_name;

                bEdit.pincode = clientInfosPayload.pincode;
                bEdit.byemployee = clientInfosPayload.byemployee;
                bEdit.byemployeename = clientInfosPayload.byemployeename;
                bEdit.active = clientInfosPayload.active;

                bEdit.A = clientInfosPayload.A;
                bEdit.RC = clientInfosPayload.RC;
                bEdit.HTR = clientInfosPayload.HTR;
                bEdit.LA = clientInfosPayload.LA;
                bEdit.HP = clientInfosPayload.HP;
                bEdit.PPC = clientInfosPayload.PPC;
                bEdit.OTHERS = clientInfosPayload.OTHERS;

                bEdit.countryname = clientInfosPayload.countryname;
                bEdit.state = clientInfosPayload.state;
                bEdit.cityname = clientInfosPayload.cityname;
                bEdit.city = clientInfosPayload.city;

                await bEdit.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${clientInfosPayload.flag == 'E' ? 'Edited' : 'Created'} a Borrower Successfully`;
            texts['DATA'] = [];
        };
    } catch (e) {
        // console.log(e)
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/loanApprovalsPermissiones', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let clientInfosPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(clientInfosPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            // let company = await branch.findOne({ _id: clientInfosPayload.branch_id });
            // clientInfosPayload['branch_name'] = company.bname;

            if (clientInfosPayload.flag == 'S') { // CREATE
                delete clientInfosPayload.id;
                let createBorrower = await clientInfos.create(clientInfosPayload);
                await createBorrower.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (clientInfosPayload.flag == 'E') {
                let bEdit = await clientInfos.findOne({ _id: clientInfosPayload.id });
                bEdit.name = clientInfosPayload.name;
                bEdit.aadhar = clientInfosPayload.aadhar;
                bEdit.ccode = clientInfosPayload.ccode;
                bEdit.contact_no = clientInfosPayload.contact_no;
                bEdit.description = clientInfosPayload.description;
                bEdit.branch_id = clientInfosPayload.branch_id;
                bEdit.branch_name = clientInfosPayload.branch_name;

                bEdit.pincode = clientInfosPayload.pincode;
                bEdit.byemployee = clientInfosPayload.byemployee;
                bEdit.byemployeename = clientInfosPayload.byemployeename;
                bEdit.active = clientInfosPayload.active;

                bEdit.A = clientInfosPayload.A;
                bEdit.RC = clientInfosPayload.RC;
                bEdit.HTR = clientInfosPayload.HTR;
                bEdit.LA = clientInfosPayload.LA;
                bEdit.HP = clientInfosPayload.HP;
                bEdit.PPC = clientInfosPayload.PPC;
                bEdit.OTHERS = clientInfosPayload.OTHERS;

                bEdit.countryname = clientInfosPayload.countryname;
                bEdit.state = clientInfosPayload.state;
                bEdit.cityname = clientInfosPayload.cityname;
                bEdit.city = clientInfosPayload.city;

                await bEdit.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = `${clientInfosPayload.flag == 'E' ? 'Edited' : 'Created'} a Borrower Successfully`;
            texts['DATA'] = [];
        };
    } catch (e) {
        // console.log(e)
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});
// borrower end


usableRoutes.post('/create-team', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let createTe = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        if (Object.keys(createTe).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            if (!Array.isArray(createTe.cader)) {
                texts['S_CODE'] = 400;
                texts['S_MSG'] = "Invalid Payload Structure";
                texts['DATA'] = [];
            } else {
                for (const usersUpdate of createTe['cader']) {
                    for (const userUpdat of usersUpdate.users) {
                        const userUpdates = await userModels.findById(userUpdat['id']);
                        if (userUpdates) {
                            userUpdates.branchid = createTe.branch;
                            const getBranchDetails = await branch.findById(createTe.branch);
                            if (getBranchDetails) {
                                userUpdates.companyid = getBranchDetails.cId;
                                userUpdates.companyname = getBranchDetails.cname;
                                userUpdates.branchname = getBranchDetails.bname;
                                await userUpdates.save();
                            } else {
                                // console.error("Branch details not found for user:", userUpdates._id);
                            }
                        } else {
                            // consol
                        }
                    }
                }
            };

            let bEdit = await createteams.findOne({ branch: createTe.branch });
            if (bEdit != null) {
                await createteams.updateOne({ branch: createTe.branch }, { $set: createTe });
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `Edited team successfully`;
                texts['DATA'] = [];
                // await bEdit.save();
            } else {
                let team = await createteams.create(createTe);
                // console
                await team.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `Created team successfully`;
                texts['DATA'] = [];
            }

        };
    } catch (e) {
        // console.log(e)
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});


usableRoutes.post('/getteams', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getCaderId = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;
        let getBranches = await createteams.findOne({ branch: getCaderId.branch });
        if (getBranches != null) {
            texts['S_CODE'] = 200;
            texts['S_MSG'] = "SUCCESS";
            texts['DATA'] = getBranches;
        } else {
            texts['S_CODE'] = 300;
            texts['S_MSG'] = "SUCCESS";
            texts['DATA'] = [];
        }

    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});


usableRoutes.post('/addressmasters', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let getUnits = await CountryModel.find({});
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getUnits;
    } catch (e) {
        // console.log(e);
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

// generate loans
usableRoutes.post('/generateloans', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let generateLoansPayload = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(generateLoansPayload).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {
            if (['S', 'E'].includes(generateLoansPayload.flag)) {
                let company = await branch.findOne({ _id: generateLoansPayload.branch });
                generateLoansPayload['branchname'] = company.bname;
            };

            if (generateLoansPayload.flag == 'S') { // CREATE
                delete generateLoansPayload.id;
                let saveLoan = await generateLoans.create(generateLoansPayload);
                await saveLoan.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (generateLoansPayload.flag == 'E') {
                let bEdit = await generateLoans.findOne({ _id: generateLoansPayload.id });
                bEdit.smtcode = generateLoansPayload.smtcode;
                bEdit.branch = generateLoansPayload.branch;
                bEdit.branchname = generateLoansPayload.branchname;
                bEdit.borrowername = generateLoansPayload.borrowername;
                bEdit.borrower = generateLoansPayload.borrower;
                bEdit.housetype = generateLoansPayload.housetype;
                bEdit.prodtype = generateLoansPayload.prodtype;
                bEdit.loanamount = generateLoansPayload.loanamount;
                bEdit.loanschedule = generateLoansPayload.loanschedule;
                bEdit.tenure = generateLoansPayload.tenure;
                bEdit.bankname = generateLoansPayload.bankname;
                bEdit.accountno = generateLoansPayload.accountno;
                bEdit.accountname = generateLoansPayload.accountname;
                bEdit.ifsc = generateLoansPayload.ifsc;
                bEdit.surityname = generateLoansPayload.surityname;
                bEdit.surityaadhar = generateLoansPayload.surityaadhar;
                bEdit.surityhousetype = generateLoansPayload.surityhousetype;
                bEdit.contactnumber = generateLoansPayload.contactnumber;
                bEdit.deposit = generateLoansPayload.deposit;
                bEdit.approvalstatus = generateLoansPayload.approvalstatus;
                bEdit.approvalremarks = generateLoansPayload.approvalremarks;
                bEdit.approvalby = generateLoansPayload.approvalby;
                bEdit.description = generateLoansPayload.description;
                await bEdit.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (generateLoansPayload.flag == 'ST') {
                let bEdit = await generateLoans.findOne({ _id: generateLoansPayload.id });
                bEdit.approvalstatus = generateLoansPayload.approvalstatus;
                bEdit.approvalremarks = generateLoansPayload.approvalremarks;
                bEdit.approvalby = generateLoansPayload.create_by;
                await bEdit.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            } else if (generateLoansPayload.flag == 'DISBURSEMENT') {
                let bEdit = await generateLoans.findOne({ _id: generateLoansPayload.id });
                bEdit.paymenttype = generateLoansPayload.paymenttype;
                bEdit.disbursementstatus = generateLoansPayload.disbursementstatus;
                bEdit.disbursementstatusremarks = generateLoansPayload.disbursementstatusremarks;
                await bEdit.save();
                texts['S_CODE'] = 200;
                texts['S_MSG'] = `SUCCESS`;
                texts['DATA'] = [];
            }
            texts['S_CODE'] = 200;
            if (generateLoansPayload.flag == 'E') {
                texts['S_MSG'] = `Edited a loan  for ${generateLoansPayload.borrower} Successfully`
            } else if (generateLoansPayload.flag == 'S') {
                texts['S_MSG'] = `Created a loan  for ${generateLoansPayload.borrower} Successfully`
            } else if (generateLoansPayload.flag == 'DISBURSEMENT') {
                texts['S_MSG'] = `Disbursed a loan  for ${generateLoansPayload.borrower} Successfully`
            } else {
                texts['S_MSG'] = `Approved a loan  for ${generateLoansPayload.borrower} Successfully`
            }
            // = `${generateLoansPayload.flag == 'E' ? 'Edited' : 'Created'} ;
            texts['DATA'] = [];
        };
    } catch (e) {
        // console.log(e)
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});


usableRoutes.post('/payment', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let payments = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(payments).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (payments.flag == 'S') { // CREATE
                let createGenders = await paymentsTables.create(payments);
                await createGenders.save();
                let updateDueAmount = await generateLoans.findOne({ smtcode: payments.smtcode });
                let getActualLoanAmount = parseInt(updateDueAmount.loanamount);

                if (parseInt(payments['collectedAmount']) > getActualLoanAmount) {
                    texts['S_CODE'] = 204;
                    texts['S_MSG'] = `Collected amount exceeds Borrowed amount`;
                    texts['DATA'] = [];
                } else {
                    let totalPayments = 0;
                    await paymentsTables.find({ smtcode: payments.smtcode }).then(res => {
                        if (res.length > 0) {
                            res.forEach(ele => totalPayments += parseInt(ele['collectedAmount']))
                        }
                    });
                    updateDueAmount.paymentcnt = await paymentsTables.find({ smtcode: payments.smtcode }).countDocuments();
                    updateDueAmount.showhistory = await paymentsTables.find({ smtcode: payments.smtcode }).countDocuments() > 0 ? true : false;

                    //  if (totalPayments === getActualLoanAmount) updateDueAmount.paymentcnt = -1;
                    updateDueAmount.dueamount = getActualLoanAmount == totalPayments ? 0 : getActualLoanAmount - totalPayments;
                    updateDueAmount.hide = getActualLoanAmount == totalPayments ? false : true
                    updateDueAmount.save();
                    texts['S_CODE'] = 200;
                    texts['S_MSG'] = `Payment SUCCESS`;
                    texts['DATA'] = [];
                };

            } else if (payments.flag == 'E') {

            }
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/producsts-save', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let createProducts = cryptos.enableCrypto(req) ? cryptos.decrypt(req.body.secure) : req.body.secure;//cryptos.decrypt(req.body.secure);
        if (Object.keys(createProducts).length == 0) {
            texts['S_CODE'] = 400;
            texts['S_MSG'] = "No Payload Submitted to Create";
            texts['DATA'] = [];
        } else {

            if (createProducts.flag == 'S') { // CREATE
                delete createProducts._id;
                let createProduct = await productsTableDatas.create(createProducts);
                await createProduct.save();

            } else if (createProducts.flag == 'E') {

                let editProdct = await productsTableDatas.findOne({ _id: createProducts._id });

                editProdct.pid = createProducts.pid;
                editProdct.category = createProducts.category;
                editProdct.product = createProducts.product;
                editProdct.suritystatus = createProducts.suritystatus;
                editProdct.tenure = createProducts.tenure;
                editProdct.roi = createProducts.roi;
                editProdct.repayment = createProducts.repayment;
                editProdct.active = createProducts.active;
                await editProdct.save();

            };
            texts['S_CODE'] = 200;
            texts['S_MSG'] = "Success";
            texts['DATA'] = [];
        };
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

usableRoutes.post('/getproducsts', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", }
    try {
        let getAllProducts = await productsTableDatas.find({ active: true });
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = getAllProducts;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    }
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});



usableRoutes.post('/historypayments', async (req, res) => {
    let texts = { S_CODE: null, S_MSG: "", };
    try {
        let historypayments = await paymentsTables.find({ smtcode: req.body.secure['smtcode'], loanid: req.body.secure['loanid'] });
        texts['S_CODE'] = 200;
        texts['S_MSG'] = "SUCCESS";
        texts['DATA'] = historypayments;
    } catch (e) {
        texts['S_CODE'] = 400;
        texts['S_MSG'] = "SERVER ERROR";
        texts['DATA'] = [];
    };
    res.json(cryptos.enableCrypto(req) ? cryptos.encrypt(JSON.stringify(texts)) : texts);
});

module.exports = usableRoutes;