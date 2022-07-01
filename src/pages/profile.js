import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { API_URL, DOMAIN } from '../core/constant';
import axios from 'axios';
import VCard from 'vcard-creator'
import FileSaver from 'file-saver';
import Footer from '../components/footer';

//Modals
import { ShareModal, QRModal } from '../components/modals';


function Profile() {
    let history = useHistory();
    let { profileCode } = useParams();


    const [profile, setProfile] = useState({ firstname: '', lastname: '', birthday: '', orgName: '', position: '', note: '', createdDate: '', photo: null });
    const [phones, setPhones] = useState([]);
    const [emails, setEmails] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const [reqWait, setReqWait] = useState(true);

    useEffect(() => {
        if (profileCode && profileCode.length === 8) {

            axios.get(API_URL + '/card.php?profile_code=' + profileCode).then((resp) => {
                if (resp.data.status === 'success') {
                    //#region Profile
                    let pr = resp.data.profile;
                    setProfile({
                        firstname: pr.FIRSTNAME,
                        lastname: pr.LASTNAME,
                        birthday: pr.BIRTHDAY,
                        orgName: pr.ORG_NAME,
                        position: pr.POSITION_TITLE,
                        note: pr.NOTE,
                        createdDate: pr.CREATED_DATE,
                        photo: DOMAIN + '/photo/' + profileCode + '.blob'
                    });
                    //#endregion

                    //#region Phones
                    let tmpPhones = [];
                    resp.data.phones.map((p) => {
                        tmpPhones = [...tmpPhones, {
                            typeName: p.TYPE_NAME,
                            number: p.PHONE
                        }]
                    });
                    setPhones(tmpPhones);
                    //#endregion

                    //#region Emails
                    let tmpEmails = [];
                    resp.data.emails.map((e) => {
                        tmpEmails = [...tmpEmails, {
                            typeName: e.TYPE_NAME,
                            email: e.EMAIL
                        }]
                    });
                    setEmails(tmpEmails);
                    //#endregion

                    //#region Websites
                    let tmpWebsites = [];
                    resp.data.websites.map((w) => {
                        tmpWebsites = [...tmpWebsites, {
                            typeName: w.TYPE_NAME,
                            url: w.WEBSITE
                        }]
                    });
                    setWebsites(tmpWebsites);
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
                    setAddresses(tmpAddresses);
                    //#endregion
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

    const handleSave = () => {
        const myVCard = new VCard();
        myVCard
            // Add personal data
            .addName(profile.lastname, profile.firstname)
            // Add work data
            .addCompany(profile.orgName)
            .addJobtitle(profile.position);


        phones.map((p) => {
            myVCard.addPhoneNumber(p.number, p.typeName)
        });

        emails.map((e) => {
            myVCard.addEmail(e.email, e.typeName)
        });

        websites.map((w) => {
            myVCard.addURL(w.url, w.typeName)
        });

        addresses.map((a) => {
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

        const blob = new Blob([myVCard.toString()], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, profileCode + '.vcf');
        //history.push('/')
    }
    return (
        <div id="main-content">
            {reqWait ? (
                <span>Lütfen bekleyin...</span>
            ) : (
                <div id="view-card-container">
                    <div className="body">
                        <div>
                            <div className="vcard-header p-2">
                                <h1>
                                    <a className="text-dark">
                                        <img src="/logo.png" height={120} />
                                    </a>
                                </h1>
                                <h2>Hayat artık daha dijital</h2>
                            </div>
                            <div className="p-2">
                                <div className="view-profile-container d-sm-flex">
                                    <div className="flex-grow-1">
                                        <div>
                                            {profile.photo ? (
                                                <img src={profile.photo + '?random_number=' + new Date().getTime()} style={{ borderRadius: "50%", height: 180, width: 180 }}
                                                    onError={() => setProfile({ ...profile, photo: null })}
                                                />
                                            ) : (null)}
                                        </div>
                                        <div>
                                            <h2 style={{fontWeight: 'bold'}}>{profile.firstname} {profile.lastname}</h2>
                                        </div>
                                        <div className="view-profile-main">
                                            <div style={{fontWeight: 'bold', fontSize: 14}}>{profile.orgName}</div>
                                            <div style={{fontWeight: 'bold', fontSize: 14, fontStyle: 'italic'}}>{profile.position}</div>
                                            <div className="brand"></div>
                                        </div>
                                    </div>
                                    <div className="view-actions">
                                        <div className="d-flex">
                                            <div className="share-button">
                                                <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#qr-modal">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="qrcode" class="svg-inline--fa fa-qrcode fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"></path></svg>
                                                </button>
                                                <p>Karekod</p>
                                            </div>

                                            <div className="share-button">
                                                <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#share-modal">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" className="svg-inline--fa fa-share-alt fa-w-14 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
                                                    </svg>
                                                </button>
                                                <p>Paylaş</p>
                                            </div>
                                            <div className="share-button" onClick={handleSave}>
                                                <a className="btn btn-outline-dark">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" className="svg-inline--fa fa-download fa-w-16 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                                                    </svg>
                                                </a>
                                                <p>Kaydet</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    {phones.length ? (
                                        <div className="phone card-section d-sm-flex">
                                            <div className="section-label-col d-flex">
                                                <div className="section-icon">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" className="svg-inline--fa fa-phone fa-w-16 fa-fw fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path>
                                                    </svg>
                                                </div>
                                                <div className="section-label">Telefon</div>
                                            </div>
                                            <div className="section-value-col truncate">
                                                {phones.map((p) => {
                                                    return (
                                                        <div className="section-value">
                                                            <div>
                                                                <a href={'tel:' + p.number}>
                                                                    {p.typeName + ': ' + p.number}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ) : null}
                                    {emails.length ? (
                                        <div className="email d-sm-flex card-section">
                                            <div className="section-label-col d-flex">
                                                <div className="section-icon">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" className="svg-inline--fa fa-envelope fa-w-16 fa-fw fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                                                    </svg>
                                                </div>
                                                <div className="section-label">E-Posta</div>
                                            </div>
                                            <div className="section-value-col truncate">
                                                {emails.map((e) => {
                                                    return (
                                                        <div className="section-value">
                                                            <div>
                                                                <a href={'mailto:' + e.email}>
                                                                    {e.typeName + ': ' + e.email}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ) : null}
                                    {websites.length ? (
                                        <div className="urls d-sm-flex card-section">
                                            <div className="section-label-col d-flex">
                                                <div className="section-icon">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" className="svg-inline--fa fa-globe fa-w-16 fa-fw fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                                        <path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>
                                                    </svg>
                                                </div>
                                                <div className="section-label">Website</div>
                                            </div>
                                            <div className="section-value-col truncate">
                                                {websites.map((w) => {
                                                    return (
                                                        <div className="section-value">
                                                            <div>
                                                                <a href={w.url}>
                                                                    {w.typeName + ': ' + w.url}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ) : null}
                                    {addresses.length ? (
                                        <div className="address d-sm-flex card-section">
                                            <div className="section-label-col d-flex">
                                                <div className="section-icon">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marked-alt" className="svg-inline--fa fa-map-marked-alt fa-w-18 fa-fw fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                        <path fill="currentColor" d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"></path>
                                                    </svg>
                                                </div>
                                                <div className="section-label">Adres</div>
                                            </div>
                                            <div className="section-value-col truncate">
                                                {addresses.map((a) => {
                                                    return (
                                                        <div className="section-value">
                                                            <div className="address-entry">
                                                                {a.typeName + ': ' + a.name} <br />
                                                                {a.address} <br />
                                                                {a.city} <span>,&nbsp;</span>{a.town} <br />
                                                                Posta Kodu <span>:&nbsp;</span>{a.zipCode}
                                                            </div>
                                                            <br />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ) : null}
                                    {profile.birthday ? (
                                        <div className="birthday d-sm-flex card-section">
                                            <div className="section-label-col d-flex">
                                                <div className="section-icon">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="birthday-cake" className="svg-inline--fa fa-birthday-cake fa-w-14 fa-fw fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor" d="M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z"></path>
                                                    </svg>
                                                </div>
                                                <div className="section-label">Doğum Tarihi</div>
                                            </div>
                                            <div className="section-value-col truncate">
                                                <div className="section-value">{profile.birthday}</div>
                                            </div>
                                        </div>
                                    ) : null}
                                    {profile.note ? (
                                        <div className="note d-sm-flex card-section">
                                            <div className="section-label-col d-flex">
                                                <div className="section-icon">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sticky-note" className="svg-inline--fa fa-sticky-note fa-w-14 fa-fw fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor" d="M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3 10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6 7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z"></path>
                                                    </svg>
                                                </div>
                                                <div className="section-label">Not</div>
                                            </div>
                                            <div className="section-value-col wrap">
                                                <div className="section-value">{profile.note}</div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="view-card-footer">{profile.createdDate} tarihinde oluşturuldu.<br />
                                <Link to={'/p/edit/' + profileCode}>Kartı düzenle</Link>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            )}
            <ShareModal
                web={DOMAIN + '/p/' + profileCode}
                vcf={DOMAIN + '/vcf/' + profileCode}
                json={DOMAIN + '/json/' + profileCode}
                qr={DOMAIN + '/qr/' + profileCode + '.png'}
            />
            <QRModal qrImageUrl={DOMAIN + '/qr/' + profileCode + '.png'} />
        </div>
    )
}

export default Profile;