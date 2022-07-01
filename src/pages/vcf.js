import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { API_URL, DOMAIN } from '../core/constant';
import axios from 'axios';
import VCard from 'vcard-creator'
import FileSaver from 'file-saver';

function VCF() {
    let history = useHistory();
    let { profileCode } = useParams();

    const [reqWait, setReqWait] = useState(true);

    useEffect(() => {
        if (profileCode && profileCode.length === 8) {

            axios.get(API_URL + '/card.php?profile_code=' + profileCode).then((resp) => {
                if (resp.data.status === 'success') {
                    //#region Profile
                    let pr = resp.data.profile;
                    let tmpProfile = {
                        firstname: pr.FIRSTNAME,
                        lastname: pr.LASTNAME,
                        birthday: pr.BIRTHDAY,
                        orgName: pr.ORG_NAME,
                        position: pr.POSITION_TITLE,
                        note: pr.NOTE,
                        createdDate: pr.CREATED_DATE,
                        photo: DOMAIN + '/photo/' + profileCode + '.blob'
                    };
                    //#endregion

                    //#region Phones
                    let tmpPhones = [];
                    resp.data.phones.map((p) => {
                        tmpPhones = [...tmpPhones, {
                            typeName: p.TYPE_NAME,
                            number: p.PHONE
                        }]
                    });
                    //#endregion

                    //#region Emails
                    let tmpEmails = [];
                    resp.data.emails.map((e) => {
                        tmpEmails = [...tmpEmails, {
                            typeName: e.TYPE_NAME,
                            email: e.EMAIL
                        }]
                    });
                    //#endregion

                    //#region Websites
                    let tmpWebsites = [];
                    resp.data.websites.map((w) => {
                        tmpWebsites = [...tmpWebsites, {
                            typeName: w.TYPE_NAME,
                            url: w.WEBSITE
                        }]
                    });
                    //#endregion

                    //#region Addresses
                    let tmpAddresses = [];
                    resp.data.addresses.map((a) => {
                        tmpAddresses = [...tmpAddresses, {
                            name: a.ADDRESS_NAME,
                            typeName: a.TYPE_NAME,
                            address: a.ADDRESS_CONTENT,
                            city: a.CITY,
                            town: a.TOWN,
                            country: a.COUNTRY,
                            zipCode: a.ZIP_CODE
                        }]
                    });
                    //#endregion

                    create(tmpProfile, tmpPhones, tmpEmails, tmpWebsites, tmpAddresses);

                }
                else {
                    history.push('/');
                }
            }).catch((error) => {
                console.log(error.message);
                history.push('/');
            }).finally(() => {
                setReqWait(false)
            })
        }
        else {
            history.push('/');
        }

    }, [])

    const create = (tmpProfile, tmpPhones, tmpEmails, tmpWebsites, tmpAddresses) => {
        const myVCard = new VCard();
        myVCard
            // Add personal data
            .addName(tmpProfile.lastname, tmpProfile.firstname)
            // Add work data
            .addCompany(tmpProfile.orgName)
            .addJobtitle(tmpProfile.position);


        tmpPhones.map((p) => {
            myVCard.addPhoneNumber(p.number, p.typeName)
        });

        tmpEmails.map((e) => {
            myVCard.addEmail(e.email, e.typeName)
        });

        tmpWebsites.map((w) => {
            myVCard.addURL(w.url, w.typeName)
        });

        tmpAddresses.map((a) => {
            myVCard.addAddress(
                a.name,
                "",
                a.address,
                a.city,
                "",
                a.zipCode,
                a.country,
                a.typeName
            )
        });

        const blob = new Blob([myVCard.toString()], { type: "text/x-vcard;charset=utf-8" });
        FileSaver.saveAs(blob, profileCode + '.vcf');
        //history.push('/')
    }
    return (
        <div></div>
    )
}

export default VCF;