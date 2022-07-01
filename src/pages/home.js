import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../core/constant';
import axios from 'axios';

//components
import Phone from '../components/phone';
import Email from '../components/email';
import Website from '../components/website';
import Address from '../components/address';
import Photo from '../components/photo';
import Footer from '../components/footer';

//Modals
import { AccountModal } from '../components/modals';

function Home() {
    let history = useHistory();
    //#region Get All Types
    const [allTypes, setAllTypes] = useState({ phone: [], email: [], website: [], address: [] });
    useEffect(() => {
        axios.get(API_URL + '/types.php').then((resp) => {
            if (resp.data.status === 'success') {
                setAllTypes({
                    phone: resp.data.phone,
                    email: resp.data.email,
                    website: resp.data.website,
                    address: resp.data.address
                });
            }
        }).catch((error) => {
            console.log(error.message);
        })
    }, []);
    //#endregion

    //#region Profiles
    const [passwordShow, setPasswordShow] = useState(false);
    const [profile, setProfile] = useState({ cardName: '', email: '', password: '', firstname: '', lastname: '', birthday: '', orgName: '', position: '', note: '', photo: null });
    //#endregion

    //#region Phones
    const [phones, setPhones] = useState([])
    const handlePhoneAdd = () => {
        setPhones([...phones, { typeId: 0, number: '' }])
    }
    //#endregion

    //#region Emails
    const [emails, setEmails] = useState([])
    const handleEmailAdd = () => {
        setEmails([...emails, { typeId: 0, email: '' }]);
    }
    //#endregion

    //#region Websites
    const [websites, setWebsites] = useState([]);
    const handleWebsiteAdd = () => {
        setWebsites([...websites, { typeId: 0, url: '' }]);
    }
    //#endregion

    //#region Addresses
    const [addresses, setAddresses] = useState([]);
    const handleAddressAdd = () => {
        setAddresses([...addresses, { typeId: 0, name: '', address: '', city: '', town: '', country: '', zipCode: '' }])
    }
    //#endregion

    //#region All State Control
    const defaultError = { id: '', part: '', message: '', index: 0 };
    const [error, setError] = useState(defaultError);

    const handleControl = () => {
        let errorArr = null;
        //#region Account Password Control
        if (!profile.password) {
            errorArr = { ...error, id: 'account-password', part: 'account', message: 'Lütfen şifrenizi boş bırakmayın!' }
        }
        else {
            //#region Account Email Control
            if (!profile.email) {
                errorArr = { ...error, id: 'account-email', part: 'account', message: 'Lütfen e-posta adresinizi boş bırakmayın!' }
            }
            else {
                //#region Profile Control
                if (profile.firstname) {
                    //#region Phone Control
                    if (phones.length) {
                        phones.map((phone, index) => {
                            //if there is no error continue
                            if (!error.index) {
                                if (parseInt(phone.typeId)) {
                                    if (!phone.number) {
                                        errorArr = { id: 'number', part: 'phone', message: 'Lütfen telefon numaranızı boş bırakmayın!', index: index }
                                    }
                                }
                                else {
                                    errorArr = { id: 'type', part: 'phone', message: 'Lütfen telefon türünü seçin!', index: index }
                                }
                            }
                        })
                    }
                    //#endregion

                    //#region Email Control
                    if (emails.length) {
                        emails.map((email, index) => {
                            //if there is no error continue
                            if (!error.index) {
                                if (parseInt(email.typeId)) {
                                    if (!email.email) {
                                        errorArr = { id: 'email', part: 'email', message: 'Lütfen e-posta adresinizi boş bırakmayın!', index: index }
                                    }
                                }
                                else {
                                    errorArr = { id: 'type', part: 'email', message: 'Lütfen e-posta türünü seçin!', index: index }
                                }
                            }
                        })
                    }
                    //#endregion

                    //#region Website Control
                    if (websites.length) {
                        websites.map((website, index) => {
                            //if there is no error continue
                            if (!error.index) {
                                if (parseInt(website.typeId)) {
                                    if (!website.url) {
                                        errorArr = { id: 'url', part: 'website', message: 'Lütfen website adresinizi boş bırakmayın!', index: index }
                                    }
                                }
                                else {
                                    errorArr = { id: 'type', part: 'website', message: 'Lütfen website türünü seçin!', index: index }
                                }
                            }
                        })
                    }
                    //#endregion

                    //#region Address Control
                    if (addresses.length) {
                        addresses.map((address, index) => {
                            //if there is no error continue
                            if (!error.index) {
                                if (parseInt(address.typeId)) {
                                    if (address.name) {
                                        if (address.address) {
                                            if (address.city) {
                                                if (!address.town) {
                                                    errorArr = { id: 'town', part: 'address', message: 'Lütfen ilçe bilgisini boş bırakmayın!', index: index }
                                                }
                                            }
                                            else {
                                                errorArr = { id: 'city', part: 'address', message: 'Lütfen şehir bilgisini boş bırakmayın!', index: index }
                                            }
                                        }
                                        else {
                                            errorArr = { id: 'address', part: 'address', message: 'Lütfen açık adresinizi boş bırakmayın!', index: index }
                                        }
                                    }
                                    else {
                                        errorArr = { id: 'name', part: 'address', message: 'Lütfen adres adını boş bırakmayın!', index: index }
                                    }
                                }
                                else {
                                    errorArr = { id: 'type', part: 'address', message: 'Lütfen adres türünü seçin!', index: index }
                                }
                            }
                        })
                    }
                    //#endregion
                }
                else {
                    errorArr = { ...error, id: 'firstname', part: 'profile', message: 'Lütfen adınızı boş bırakmayın!' }
                }
                //#endregion
            }
            //#endregion
        }
        //#endregion
        
        //#region Account Modal
        if(!errorArr) {
            if(profile.email && profile.password) {
                handleCreate();
            }
            else {
                //window.$('#account-modal').modal('show');
            }
        }
        //#endregion

        setError(errorArr || defaultError);
    }
    //#endregion

    const [reqWait, setReqWait] = useState(false);

    const handleCreate = () => {
        setReqWait(true);
        window.$('#account-modal').modal('hide');

        //#region Phones
        let tmpPhones = [];
        phones.map((p) => {
            tmpPhones = [...tmpPhones, { phone_type: p.typeId, phone: p.number }];
        })
        //#endregion

        //#region Emails
        let tmpEmails = [];
        emails.map((e) => {
            tmpEmails = [...tmpEmails, { email_type: e.typeId, email: e.email }];
        })
        //#endregion

        //#region Websites
        let tmpWebsites = [];
        websites.map((w) => {
            tmpWebsites = [...tmpWebsites, { website_type: w.typeId, website: w.url }];
        })
        //#endregion

        //#region Addresses
        let tmpAddresses = [];
        addresses.map((a) => {
            tmpAddresses = [...tmpAddresses, { 
                address_type: a.typeId,
                address_name: a.name,
                address_content: a.address,
                city: a.city,
                town: a.town,
                country: a.country,
                zip_code: a.zipCode
            }];
        })
        //#endregion

        //#region Axios with Create Card
        axios.post(API_URL + '/card_create.php', {
            profile: {
                card_name: profile.cardName,
                email: profile.email,
                password: profile.password,
                firstname: profile.firstname,
                lastname: profile.lastname,
                birthday: profile.birthday,
                org_name: profile.orgName,
                position_title: profile.position,
                note: profile.note.replace(/'/g, '"')
            },
            phones: tmpPhones,
            emails: tmpEmails,
            websites: tmpWebsites,
            addresses: tmpAddresses
        }).then((resp) => {
            if(resp.data.status === 'success') {
                if(profile.photo) {
                    //#region Photo Upload
                    fetch(profile.photo).then((file) => {
                        file.blob().then((theBlob) => {
                            var formData = new FormData();
                            theBlob.lastModifiedDate = new Date();
                            theBlob.name = "file_name";
                            formData.append("photo", theBlob);
                            formData.append("profile_code", resp.data.profile_code);

                            axios.post(API_URL + '/photo_upload.php', formData, { headers: { 'Content-Type': 'multipart/form-data' }}).then(() => {
                                history.push('/p/' + resp.data.profile_code);
                            }).catch((error) =>{
                                console.log(error.message)
                            })
                        })
                    })
                    //#endregion
                }
                else {
                    history.push('/p/' + resp.data.profile_code);
                }
            }
            else {
                console.log(resp.data.message);
            }
        }).catch((error) => {
            console.log(error.message);
        })
        //#endregion
    }
    
    return (<>
        <div id="main-content">
            <div id="create-card-container">
                <div className="body">
                    <div>
                        <div className="vcard-header p-2">
                            <h1>
                                <a className="text-dark">
                                    <img src="./logo.png" height={120} />
                                </a>
                            </h1>
                            <h2>Hayat artık daha dijital</h2>
                        </div>
                        <div className="card-create-process-container">
                            <div className="card-create-process">
                                <p>KartDijital'de çevrimiçi bir kartvizit oluşturabilir ve bunu kişilerinizle paylaşabilirsiniz.</p>
                                <p>2 adımlı kolay bir işlemdir:</p>
                                <ol>
                                    <li>Aşağıdaki formu iletişim bilgilerinizle doldurun.</li>
                                    <li>Kart bağlantınızı veya QR kodunuzu kopyalayın ve paylaşın.</li>
                                </ol>
                                <p>Bağlantı ve QR kodu, web sitenize veya e-postanıza tamamen yerleştirilebilir. Dosyayı veya resmi indirmeniz yeterlidir
                                    ve istediğiniz yere ekleyin.</p>
                                <p>Kart bilgilerinizi güncel tutmak istiyorsanız, bir e-posta ve şifre girdiğinizden emin olun.</p>
                            </div>
                        </div>
                        <div className="card-form-container">
                            <form>
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label">Kart Hakkında</label>
                                    <div className="col-12 col-sm-9">
                                        <div className="row">
                                            <div className="col-12">
                                                <input
                                                    className="form-control"
                                                    placeholder="Kart Adı"
                                                    onChange={(e) => setProfile({ ...profile, cardName: e.target.value })}
                                                    value={profile.cardName}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row thin">
                                    <label className="col-12 col-sm-3 col-form-label">Yetkilendirme</label>
                                    <div className="col-12 col-sm-9">
                                        <div className="row no-gutters">
                                            <div className="col-12 col-md-6">
                                                <input
                                                    className={`form-control ${error.id === 'account-email' ? 'is-invalid' : null}`}
                                                    placeholder="E-posta Adresi"
                                                    onChange={(e) => {
                                                        setProfile({ ...profile, email: e.target.value });
                                                        setError(defaultError);
                                                    }}
                                                    value={profile.email}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="input-group">
                                                    <input
                                                        className={`has-trailing-input-icon form-control ${error.id === 'account-password' ? 'is-invalid' : null}`}
                                                        placeholder="Şifre"
                                                        type={passwordShow ? 'text' : 'password'}
                                                        onChange={(e) => {
                                                            setProfile({ ...profile, password: e.target.value });
                                                            setError(defaultError);
                                                        }}
                                                        value={profile.password}
                                                    />
                                                    <div className="trailing-input-icon input-group-append">
                                                        {passwordShow ? (
                                                            <button type="button" class="no-outline btn btn-outline-link" onClick={() => setPasswordShow(false)}>
                                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="svg-inline--fa fa-eye fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                                    <path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                                                    </path>
                                                                </svg>
                                                            </button>
                                                        ) : (
                                                            <button type="button" className="no-outline btn btn-outline-link" onClick={() => setPasswordShow(true)}>
                                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" className="svg-inline--fa fa-eye-slash fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                                    <path fill="currentColor"
                                                                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                                                    </path>
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="alert alert-primary mt-3">Bir şifre belirlemek, kartınızı daha sonra düzenlemenize olanak tanır.<br /></div>
                                    </div>
                                </div>
                                <Photo setNewPhoto={(blob) => setProfile({ ...profile, photo: blob })} />
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label">İletişim Bilgileri</label>
                                    <div className="col-12 col-sm-9">
                                        <div className="row">
                                            <div className="col-12">
                                                <input
                                                    className={`form-control ${error.id === 'firstname' ? 'is-invalid' : null}`}
                                                    placeholder="Ad"
                                                    onChange={(e) => {
                                                        setProfile({ ...profile, firstname: e.target.value });
                                                        setError(defaultError);
                                                    }}
                                                    value={profile.firstname}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <input
                                                    className="form-control"
                                                    placeholder="Soyad"
                                                    onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                                                    value={profile.lastname}
                                                />
                                            </div>
                                        </div>
                                        {error.part === 'profile' ? (
                                            <div class="message-block has-error alert alert-danger">
                                                <span class="help-block">{error.message}</span>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label">Doğum Tarihi</label>
                                    <div className="col-12 col-sm-9">
                                        <input
                                            className="form-control"
                                            placeholder="GG/AA/YYYY"
                                            onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                                            value={profile.birthday}
                                            id="birth-date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label">Meslek</label>
                                    <div className="col-12 col-sm-9">
                                        <div className="row">
                                            <div className="col-12">
                                                <input
                                                    className="form-control"
                                                    placeholder="Kuruluş Adı"
                                                    onChange={(e) => setProfile({ ...profile, orgName: e.target.value })}
                                                    value={profile.orgName}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <input
                                                    className="form-control"
                                                    placeholder="Ünvan"
                                                    onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                                                    value={profile.position}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {phones.map((phone, index) => {
                                    return (
                                        <Phone
                                            key={index}
                                            types={allTypes.phone}
                                            value={phone.number}
                                            typeId={phone.typeId}
                                            onChange={(data) => {
                                                let tmpPhones = [...phones];
                                                tmpPhones[index] = { typeId: data.id, number: data.number }
                                                setPhones(tmpPhones);
                                                setError(defaultError);
                                            }}
                                            onRemove={() => {
                                                let tmpPhones = [];
                                                phones.map((p, ind) => {
                                                    if (ind !== index) {
                                                        tmpPhones = [...tmpPhones, p];
                                                    }
                                                })

                                                setPhones(tmpPhones);
                                                setError(defaultError);
                                            }}
                                            error={error}
                                            index={index}
                                        />
                                    )
                                })}
                                <div className="form-group row add-link">
                                    <div className="col-12 col-sm-9 offset-sm-3 col-form-label thin-label">
                                        <button className="btn btn-link text-secondary" type='button' onClick={handlePhoneAdd}>Telefon Ekle</button>
                                    </div>
                                </div>
                                {emails.map((email, index) => {
                                    return (
                                        <Email
                                            key={index}
                                            types={allTypes.email}
                                            value={email.email}
                                            typeId={email.typeId}
                                            onChange={(data) => {
                                                let tmpEmails = [...emails];
                                                tmpEmails[index] = { typeId: data.id, email: data.email }
                                                setEmails(tmpEmails);
                                                setError(defaultError);
                                            }}
                                            onRemove={() => {
                                                let tmpEmails = [];
                                                emails.map((e, ind) => {
                                                    if (ind !== index) {
                                                        tmpEmails = [...tmpEmails, e];
                                                    }
                                                })

                                                setEmails(tmpEmails);
                                                setError(defaultError);
                                            }}
                                            error={error}
                                            index={index}
                                        />
                                    )
                                })}
                                <div className="form-group row add-link">
                                    <div className="col-12 col-sm-9 offset-sm-3 col-form-label thin-label">
                                        <button className="btn btn-link text-secondary" type='button' onClick={handleEmailAdd}>E-posta Adresi Ekle</button>
                                    </div>
                                </div>
                                {websites.map((website, index) => {
                                    return (
                                        <Website
                                            key={index}
                                            types={allTypes.website}
                                            value={website.url}
                                            typeId={website.typeId}
                                            onChange={(data) => {
                                                let tmpWebsites = [...websites];
                                                tmpWebsites[index] = { typeId: data.id, url: data.url }
                                                setWebsites(tmpWebsites);
                                                setError(defaultError);
                                            }}
                                            onRemove={() => {
                                                let tmpWebsites = [];
                                                websites.map((w, ind) => {
                                                    if (ind !== index) {
                                                        tmpWebsites = [...tmpWebsites, w];
                                                    }
                                                })

                                                setWebsites(tmpWebsites);
                                                setError(defaultError);
                                            }}
                                            error={error}
                                            index={index}
                                        />
                                    )
                                })}
                                <div className="form-group row add-link">
                                    <div className="col-12 col-sm-9 offset-sm-3 col-form-label thin-label">
                                        <button className="btn btn-link text-secondary" type='button' onClick={handleWebsiteAdd}>Web Sitesi Ekle</button>
                                    </div>
                                </div>
                                {addresses.map((address, index) => {
                                    return (
                                        <Address
                                            key={index}
                                            types={allTypes.address}
                                            values={address}
                                            onChange={(data) => {
                                                let tmpAddresses = [...addresses];
                                                tmpAddresses[index] = { ...data }
                                                setAddresses(tmpAddresses);
                                                setError(defaultError);
                                            }}
                                            onRemove={() => {
                                                let tmpAddresses = [];
                                                addresses.map((ad, ind) => {
                                                    if (ind !== index) {
                                                        tmpAddresses = [...tmpAddresses, ad];
                                                    }
                                                })

                                                setAddresses(tmpAddresses);
                                                setError(defaultError);
                                            }}
                                            error={error}
                                            index={index}
                                        />
                                    )
                                })}
                                <div className="form-group row add-link">
                                    <div className="col-12 col-sm-9 offset-sm-3 col-form-label thin-label">
                                        <button className="btn btn-link text-secondary" type='button' onClick={handleAddressAdd}>Adres Ekle</button>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label">Not</label>
                                    <div className="col-12 col-sm-9">
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            onChange={(e) => setProfile({ ...profile, note: e.target.value })}
                                            defaultValue={profile.note}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-sm-9 offset-sm-3">
                                        {error.part === 'account' ? (
                                            <div class="message-block has-error alert alert-danger">
                                                <span class="help-block">{error.message}</span>
                                            </div>
                                        ) : null}
                                        <div className="btn-toolbar">
                                            <button type="button" className="btn btn-primary" onClick={handleControl}>{reqWait ? 'Lütfen bekleyin...' : 'Oluştur'}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12 col-sm-9 offset-sm-3">İletişim bilgileri üçüncü taraf kişi veya kurumlarla paylaşılmayacaktır.</div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <AccountModal onNext={handleCreate} />
        </div>
        </>
    )
}

export default Home;