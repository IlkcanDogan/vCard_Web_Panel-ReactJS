import React, { useState, useCallback } from "react";
import Cropper from 'react-easy-crop';
import GetCroppedImg from "./crop";

function Photo({setNewPhoto}) {
    const [croppedArea, setCroppedArea] = useState(null);
    const defaultConfig = { src: null, crop: { x: 0, y: 0 }, zoom: 1, aspect: 1 }
    const [config, setConfig] = useState(defaultConfig)

    const [croppedPhoto, setCroppedPhoto] = useState(null);

    const handleDataChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setConfig({ ...config, src: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels)
    }, [])

    const handleCrop = () => {
        GetCroppedImg(config.src, croppedArea).then((croppedImage) => {
            handleReset();
            setCroppedPhoto(croppedImage);
            setNewPhoto(croppedImage);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleReset = () => {
        setConfig(defaultConfig);
        document.getElementById('upload').value = ""
    }
    return (<>
        <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label">Fotoğraf</label>
            <div className="col-12 col-sm-9">
                <div className="photo-dropzone">
                    <input accept="image/png,image/jpg,image/jpeg,image/gif,image/svg+xml" type="file" autoComplete="off" tabIndex="-1" onChange={handleDataChange} style={{ display: "none", marginRight: 15 }} id="upload" />
                    <div className="avatar-container">
                        <div className="avatar-photo-container">
                            {config.src ? (
                                <div>
                                    <div style={{ height: 250 }}>
                                        <Cropper
                                            image={config.src}
                                            crop={config.crop}
                                            zoom={config.zoom}
                                            aspect={config.aspect}
                                            cropShape="round"
                                            objectFit="contain"
                                            showGrid={false}
                                            onCropChange={(cr) => setConfig({ ...config, crop: cr })}
                                            onCropComplete={onCropComplete}
                                            onZoomChange={(zo) => setConfig({ ...config, zoom: zo })}
                                            style={{ containerStyle: { width: 250, height: 250, marginLeft: 15 }, cropAreaStyle: { border: 0 } }}
                                        />

                                    </div>
                                    <div className="avatar-upload-button mt-2">
                                        <button type="button" className="btn btn-primary" onClick={handleCrop}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" className="svg-inline--fa fa-check fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                            </svg>
                                        </button>
                                        <button type="button" className="ml-1 btn btn-secondary" onClick={handleReset}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                            </svg>
                                        </button>
                                        <div className="avatar-photo-zoom mt-2">
                                            <input
                                                name="scale"
                                                type="range"
                                                min="1"
                                                max="3"
                                                step="0.05"
                                                defaultValue="1"
                                                value={config.zoom}
                                                onChange={(e) => setConfig({ ...config, zoom: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {croppedPhoto ? (
                                        <img src={croppedPhoto} style={{ borderRadius: "50%", height: 150, width: 150 }} />
                                    ) : (
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" className="svg-inline--fa fa-user-circle fa-w-16 fa-10x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                            <path fill="currentColor"
                                                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z">
                                            </path>
                                        </svg>
                                    )}
                                    <div className="avatar-upload-button mt-2">
                                        <button title="Dosya Seç" type="button" className="btn btn-primary" onClick={() => document.getElementById('upload').click()}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="camera" className="svg-inline--fa fa-camera fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path fill="currentColor"
                                                    d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z">
                                                </path>
                                            </svg>
                                        </button>
                                       {croppedPhoto ? (
                                            <button type="button" className="ml-1 btn btn-secondary" onClick={() => setCroppedPhoto(null)}>
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo" className="svg-inline--fa fa-undo fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="currentColor" d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path>
                                                </svg>
                                            </button>
                                       ) : null}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Photo;