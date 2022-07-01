import React from "react";

export function AccountModal({ onNext }) {
    return (
        <div className="modal" id="account-modal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title h4" id="title">Şifre olmadan vCard oluşturulsun mu?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Hesapsız bir kart oluşturmak üzeresiniz.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">İptal</button>
                        <button type="button" className="btn btn-primary" onClick={onNext}>Devam Et</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ShareModal({web, vcf, json, qr }) {
    return (
        <div className="modal" id="share-modal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title h4" id="title">vCard Paylaş</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="">
                            <div className="form-group">
                                <label className="form-label">Web URL</label>
                                <div className="text-center d-flex align-items-center">
                                    <input disabled="" type="text" className="flex-grow-1 no-width form-control" value={web} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Karekod URL</label>
                                <div className="text-center d-flex align-items-center">
                                    <input disabled="" type="text" className="flex-grow-1 no-width form-control" value={qr} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">VCF Dosyası</label>
                                <div className="text-center d-flex align-items-center">
                                    <input disabled="" type="text" className="flex-grow-1 no-width form-control" value={vcf} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">JSON</label>
                                <div className="text-center d-flex align-items-center">
                                    <input disabled="" type="text" className="flex-grow-1 no-width form-control" value={json} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AuthModal({ onNext }) {
    return (
        <div className="modal" id="auth-modal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title h4" id="title">Hata</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        E-posta adresiniz veya şifreniz yanlış.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Tamam</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function QRModal({ qrImageUrl }) {
    return (
        <div className="modal" id="qr-modal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title h4" id="title">Karekod</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <center>
                            <img src={qrImageUrl} className="img-fluid" style={{marginLeft: -5}}/>
                        </center>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    )
}