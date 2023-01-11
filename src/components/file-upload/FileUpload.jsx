/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import "./FileUpload.css";
import axios from "axios";
import { setUploadFiles, showUploadModal } from "src/store/uploadFile-slice";
import Input from "src/components/UI/input/Input";
import Form from "react-bootstrap/Form";
import { validTextInput } from "src/helper/utils";
import useInput from "src/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Document, Page, pdfjs } from "react-pdf";
import { imageHandler } from "src/helper/baseUrls";
import Backdrop from "../UI/Backdrop/Backdrop";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import classes from "./Header.module.scss";

const FileUpload = () => {
    const [idFile, setIdFile] = useState();
    const [uploadFile, setUplodeFile] = useState();
    const [result, setResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModalRejection, setShowModalRejection] = useState();
    const [filePdf, setFilePdf] = useState();
    const [imgView, setImgView] = useState();
    const [imgSrc, setImgSrc] = useState();
    const [urlPdf, setUrlPdf] = useState();
    const [i, setI] = useState();
    const [progressNumber, setProgressNumber] = useState();
    const myRef = useRef(null);
    const fileRef = useRef(null);
    const progessRef = useRef(null);
    const submitRef = useRef(null);

    const { accessToken } = useSelector(state => state.user);
    const Api = `http://45.139.10.161:8091`;
    const max_length = 1 * 1024 * 1024;

    // important lines
    const dispatch = useDispatch();
    const { uploadFileProps, isShowUpload } = useSelector(
        state => state.upload
    );
    // fileName => your dispatch fileName
    // label,
    // title,
    // view => false || true
    // acceptType => * || image
    // fileType => document || payment

    const fileName = uploadFileProps?.fileName ?? "";
    const fileId = uploadFileProps?.fileId ?? "";
    const url = uploadFileProps?.url ?? "";
    const value = uploadFileProps?.value ?? "";
    const label = uploadFileProps?.label ?? "";
    const title = uploadFileProps?.title ?? "";
    const view = uploadFileProps?.view ?? false;
    const acceptType = uploadFileProps?.acceptType ?? "";
    const fileType = uploadFileProps?.fileType ?? "";
    const {
        hasError: hasErrorInputValue,
        inputBlurHandler: onBlurInputValue,
        isValid: validInputValue,
        value: inputValue,
        valueChangeHandler: onChangeInputValue,
    } = useInput(validTextInput, 200);

    const imageClicked = () => {
        fileRef.current.click();
    };
    const rejectHandler = event => {
        event.preventDefault();
        console.log(idFile);
        axios
            .delete(`${Api}/uploader/${idFile}/`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        dispatch(showUploadModal());
    };
    const submitHandler = e => {
        e.preventDefault();
        dispatch(showUploadModal());
    };
    let page = 1;
    useEffect(() => {
        setProgressNumber(0);
        setImgSrc();
        if (!imgSrc) {
            setUplodeFile();
        }
        if (urlPdf) {
            setFilePdf();
        }
        setResult(false);
        setIsLoading(false);
        if (view) {
            if (
                fileId.endsWith("png") ||
                fileId.endsWith("jpg") ||
                fileId.endsWith("jpeg") ||
                fileId.endsWith("jp2")
            ) {
                axios
                    .get(`${Api}/uploader/${fileId}/download/`)
                    .then(res => {
                        const imgViewUpload = (
                            <div>
                                {fileId && (
                                    <img
                                        className="imgView"
                                        alt=""
                                        src={imageHandler(fileId)}
                                    />
                                )}
                            </div>
                        );
                        setImgView(imgViewUpload);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                axios.get(`${Api}/uploader/${fileId}/download/`).then(res => {
                    let numpage = "";
                    const onDocumentLoadSuccess = ({ numPages }) => {
                        numpage = numPages;
                    };
                    const goToPrevPage = e => {
                        e.preventDefault();
                        if (page - 1 <= 1) {
                            page = 1;
                        } else {
                            page = page - 1;
                        }
                        const filePdfHandler = (
                            <div>
                                {/* <p>
                                            Page {page} of {numpage}
                                        </p> */}
                                <Document
                                    file={url}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <span
                                        onClick={goToNextPage}
                                        className="icon-uploader icon-up-uploader goToNextPage"
                                    />
                                    <span
                                        onClick={goToPrevPage}
                                        className="icon-uploader icon-down-uploader goToPrevPage"
                                    />
                                    <Page pageNumber={page} />
                                </Document>
                            </div>
                        );
                        setFilePdf(filePdfHandler);
                    };
                    const goToNextPage = e => {
                        e.preventDefault();
                        if (page + 1 >= numpage) {
                            page = numpage;
                        } else {
                            page++;
                        }
                        const filePdfHandler = (
                            <div>
                                {/* <p>
                                                Page {page} of {numpage}
                                            </p> */}
                                <Document
                                    file={url}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <span
                                        onClick={goToNextPage}
                                        className="icon-uploader icon-up-uploader goToNextPage"
                                    />
                                    <span
                                        onClick={goToPrevPage}
                                        className="icon-uploader icon-down-uploader goToPrevPage"
                                    />
                                    <Page pageNumber={page} />
                                </Document>
                            </div>
                        );
                        setFilePdf(filePdfHandler);
                    };
                    const url = `${Api}/uploader/${fileId}/download/`;
                    const filePdfHandler = (
                        <div>
                            {/* <p>
                                        Page {page} of {numpage}
                                    </p> */}
                            <Document
                                file={url}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <span
                                    onClick={goToNextPage}
                                    className="icon-uploader icon-up-uploader goToNextPage"
                                />
                                <span
                                    onClick={goToPrevPage}
                                    className="icon-uploader icon-down-uploader goToPrevPage"
                                />
                                <Page pageNumber={page} />
                            </Document>
                        </div>
                    );
                    setFilePdf(filePdfHandler);
                });
            }
        }
    }, [fileName, fileId]);
    const fileHandler = event => {
        event.preventDefault();
        const file = fileRef.current.files;
        const uploadImg = myRef.current;
        if (file.length > 0) {
            if (
                file[0].type == "image/png" ||
                file[0].type == "image/jpeg" ||
                file[0].type == "image/jpg" ||
                file[0].type == "image/jp2"
            ) {
                setImgSrc(URL.createObjectURL(file[0]));
                uploadImg.onload = function () {
                    URL.revokeObjectURL(uploadImg.src);
                };
            } else {
                let numpage = "";
                myRef.current.style.display = "none";
                const onDocumentLoadSuccess = ({ numPages }) => {
                    numpage = numPages;
                };

                const goToPrevPage = e => {
                    e.preventDefault();
                    if (page - 1 <= 1) {
                        page = 1;
                    } else {
                        page = page - 1;
                    }
                    const filePdfHandler = (
                        <div>
                            {/* <p>
                                Page {page} of {numpage}
                            </p> */}
                            <Document
                                file={url}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <span
                                    onClick={goToNextPage}
                                    className="icon-uploader icon-up-uploader goToNextPage"
                                />
                                <span
                                    onClick={goToPrevPage}
                                    className="icon-uploader icon-down-uploader goToPrevPage"
                                />
                                <Page pageNumber={page} />
                            </Document>
                        </div>
                    );
                    setFilePdf(filePdfHandler);
                    console.log(filePdfHandler);
                };
                const goToNextPage = e => {
                    e.preventDefault();
                    if (page + 1 >= numpage) {
                        page = numpage;
                    } else {
                        page++;
                    }
                    const filePdfHandler = (
                        <div>
                            {/* <p>
                                    Page {page} of {numpage}
                                </p> */}
                            <Document
                                file={url}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <span
                                    onClick={goToNextPage}
                                    className="icon-uploader icon-up-uploader goToNextPage"
                                />
                                <span
                                    onClick={goToPrevPage}
                                    className="icon-uploader icon-down-uploader goToPrevPage"
                                />
                                <Page pageNumber={page} />
                            </Document>
                        </div>
                    );
                    setFilePdf(filePdfHandler);
                };
                const file = fileRef.current.files[0];
                const url = URL.createObjectURL(file);
                setUrlPdf(url);
                console.log(url);
                const filePdfHandler = (
                    <div>
                        {/* <p>
                            Page {page} of {numpage}
                        </p> */}
                        <Document
                            file={url}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <span
                                onClick={goToNextPage}
                                className="icon-uploader icon-up-uploader goToNextPage"
                            />
                            <span
                                onClick={goToPrevPage}
                                className="icon-uploader icon-down-uploader goToPrevPage"
                            />
                            <Page pageNumber={page} />
                        </Document>
                    </div>
                );
                setFilePdf(filePdfHandler);
            }
        }
        uploed(0, null);
    };

    const uploed = (start, uploedFile) => {
        const nextChunk = start + max_length + 1;
        const currentChunk = fileRef.current.files[0].slice(start, nextChunk);
        const uploadedChunk = start + currentChunk.size;
        const finished = uploadedChunk >= fileRef.current.files[0].size ? 1 : 0;
        const formData = new FormData();
        formData.append("file", currentChunk);
        formData.append("uploadedFilename", uploedFile);
        formData.append("orginalFilename", fileRef.current.files[0].name);
        formData.append("fileType", fileType);
        formData.append("nextSlice", nextChunk);
        formData.append("isFinished", finished);
        const config = {
            onUploadProgress: function (progressEvent) {
                if (fileRef.current.files[0].size > max_length) {
                    var percentCompleted = Math.round(
                        (uploadedChunk / fileRef.current.files[0].size) * 100
                    );
                } else {
                    var percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                }
                const progress = (
                    <div>
                        <div className="file-details">
                            <div ref={progessRef} className="progress">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: percentCompleted + "%",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
                setProgressNumber(percentCompleted);
                setUplodeFile(progress);
                setIsLoading(true);
            },
        };
        axios
            .post(`${Api}/uploader/`, formData, config)
            .then(res => {
                if (nextChunk < fileRef.current.files[0].size) {
                    uploed(nextChunk, res.data.uploadedFilename);
                    setResult(true);
                } else {
                    dispatch(setUploadFiles({ [fileName]: res.data.file_id }));
                    dispatch(setUploadFiles({ [value]: inputValue }));
                    setIdFile(res.data.file_id);
                    console.log(res.data.file_id);
                    setResult(true);
                    setIsLoading(false);

                    if (!!res.file_id) {
                        console.log("api");
                    } else if (!!res.error) alert(res.error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    const formSubmitionHandler = event => {
        event.preventDefault();
    };
    if (!isShowUpload) {
        return null;
    }
    const sendOk = e => {
        e.preventDefault();
        axios
            .put(`${Api}/${url}/`, {
                bill_status: true,
                bill_rejection_reasons: "",
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
        dispatch(showUploadModal());
    };
    let data = "";
    const valueRection = e => {
        data = e.target.value;
    };
    const sendRejectionHandler = e => {
        e.preventDefault();
        const dataRejectionReason = {
            bill_status: false,
            bill_rejection_reasons: data,
        };
        axios
            .put(`${Api}/${url}/`, dataRejectionReason, {
                Authorization: "Bearer " + accessToken,
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
        dispatch(showUploadModal());
    };
    const rejrejectionHandler = e => {
        e.preventDefault();
        dispatch(showUploadModal());
    };
    const rejectionReason = e => {
        e.preventDefault();
        const rejection = (
            <div>
                <div>
                    <div className="rectionModal">
                        <div className="rejectionContainer">
                            <p className="textRejection">
                                دلایل عدم تایید خود را وارد کنید
                            </p>
                            <textarea
                                onChange={valueRection}
                                className="inputRejection"
                            />
                            <button
                                onClick={sendRejectionHandler}
                                className={"subRejection"}
                            >
                                ارسال
                            </button>
                            <button
                                onClick={rejrejectionHandler}
                                className={"rejRejction"}
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
        return setShowModalRejection(rejection);
    };
    const btnView = e => {
        e.preventDefault();
        dispatch(showUploadModal());
    };
    return (
        <>
            {isShowUpload && (
                <Backdrop
                    closeModal={() => dispatch(showUploadModal())}
                    showModal={isShowUpload}
                />
            )}
            <div className="my-modal">
                <div className="modal-container">
                    <form encType="multipart/form-data" action="">
                        {!view ? (
                            <div>
                                <Form
                                    onClick={formSubmitionHandler}
                                    className="form"
                                >
                                    <div className="form-input">
                                        {label.trim().length != 0 ? (
                                            label.startsWhit("$") ? (
                                                <Form
                                                    onSubmit={
                                                        formSubmitionHandler
                                                    }
                                                    className="form"
                                                >
                                                    <div className="form-input">
                                                        <div>
                                                            <p className="title">
                                                                {title}
                                                            </p>
                                                            <div className="divViewInfoPay">
                                                                <p className="payment">
                                                                    {label}
                                                                </p>
                                                                <p className="payMoney">
                                                                    {value}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            ) : (
                                                <div>
                                                    <p className="title">
                                                        لطفا {title} و فایل ان
                                                        را وارد کنید
                                                    </p>
                                                    <Input
                                                        width="328px"
                                                        inputType="text"
                                                        elementType="input"
                                                        value={inputValue}
                                                        placeholder={label}
                                                        changeInput={
                                                            onChangeInputValue
                                                        }
                                                        blurInput={
                                                            onBlurInputValue
                                                        }
                                                        inputIsValid={
                                                            validInputValue
                                                        }
                                                        label={label}
                                                        isTouched={
                                                            hasErrorInputValue
                                                        }
                                                        // required={required}
                                                    />
                                                </div>
                                            )
                                        ) : (
                                            <p className="title">
                                                لطفا {title} را وارد کنید
                                            </p>
                                        )}
                                    </div>
                                </Form>
                                <div className="form-group">
                                    {acceptType == "image" ? (
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/jpeg, image/png"
                                            className="form-control"
                                            onChange={fileHandler}
                                            id="file"
                                            placeholder="select file"
                                        />
                                    ) : (
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/jpeg, image/png , application/pdf"
                                            className="form-control"
                                            onChange={fileHandler}
                                            id="file"
                                            placeholder="select file"
                                        />
                                    )}
                                    {/* {idFile ?  */}
                                    <div>{filePdf}</div>
                                    {/* : null} */}
                                    {imgSrc ? (
                                        <img
                                            alt="render"
                                            src={imgSrc}
                                            id="image"
                                        />
                                    ) : (
                                        // <img
                                        //     alt="ada"
                                        //     ref={myRef}
                                        //     id="image"
                                        //     src="data:image/jpeg;base64,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"
                                        //     onClick={imageClicked}
                                        // />
                                        <div
                                            ref={myRef}
                                            id="image"
                                            onClick={imageClicked}
                                        >
                                            <div>
                                                <p className="imageText">
                                                    فایل خود را در این قسمت
                                                    بارگذاری کنید
                                                </p>
                                                <span className="iconForUpload icon icon-md i-plus-active" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div id="uploaded_files">{uploadFile}</div>
                                <div className="button">
                                    <div>
                                        {progressNumber == 100 ? (
                                            <button
                                                onClick={submitHandler}
                                                value="تایید"
                                                className="submit"
                                            >
                                                تایید
                                            </button>
                                        ) : (
                                            <button
                                                ref={submitRef}
                                                onClick={submitHandler}
                                                value="تایید"
                                                className="submit"
                                                disabled
                                            >
                                                تایید
                                                {!result && isLoading && (
                                                    <div
                                                        className="spinner-grow spinner-grow-sm"
                                                        role="status"
                                                    >
                                                        <span className="sr-only">
                                                            <p>11</p>
                                                        </span>
                                                    </div>
                                                )}
                                            </button>
                                        )}
                                        <input
                                            type="submit"
                                            onClick={rejectHandler}
                                            value="انصراف"
                                            id="reject"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {label.trim().length != 0 ? (
                                    <Form
                                        onSubmit={formSubmitionHandler}
                                        className="form"
                                    >
                                        <div className="form-input">
                                            <div>
                                                <p className="title">{title}</p>
                                                <div className="divViewInfoPay">
                                                    <p className="payment">
                                                        {label}
                                                    </p>
                                                    <p className="payMoney">
                                                        {value}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                ) : null}

                                <div>{imgView}</div>
                                <div>{filePdf}</div>
                                {!url ? (
                                    <button
                                        onClick={btnView}
                                        className="btnView"
                                    >
                                        تایید
                                    </button>
                                ) : (
                                    <div>
                                        <button
                                            onClick={rejectionReason}
                                            className="unAcceptBtnView"
                                        >
                                            عدم تایید
                                        </button>
                                        <button
                                            className="acceptBtnView"
                                            onClick={sendOk}
                                        >
                                            تایید
                                        </button>
                                        {showModalRejection}
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default FileUpload;
