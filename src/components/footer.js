import React from "react";

export default function Footer() {
    return (
        <div className="vcard-footer p-2 pt-3">
            <div className="d-flex justify-content-end">
                <div className="col-xs col-sm-6 text-light text-left">
                    <div className="form-group">
                    <h1>
                                <a className="text-dark">
                                    <img src="/logo.png" height={45} />
                                </a>
                            </h1>
                    </div>
                </div>
                <div className="col-xs col-sm-6 text-light text-right">
                    <div className="brand">
                        <a href=" https://goo.gl/maps/icTWpv5yEmrAXa1q6" className="brand-icon btn btn-outline-light mr-3 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/channel/UCiLzkN_wqRSjBaa-K_QLONQ" className="brand-icon btn btn-outline-light mt-2">
                            <svg aria-hidden="true" width="16" height="16" focusable="false" data-prefix="fab" data-icon="youtube" className="svg-inline--fa fa-youtube fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}