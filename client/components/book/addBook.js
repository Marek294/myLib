/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import InlineError from '../messages/InlineError';
import Notificator from '../messages//Notificator';
import { addBook } from '../../actions/books';
import { uploadCover } from '../../actions/upload';

import axios from 'axios';

import './_AddBook.scss';

const CLOUDINARY_UPLOAD_PRESET = 'mnywgy3d';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/myLib/upload';

function isSummaryTooLong(name,value) {
    if(name === "summary" && value.length > 2000) return value.slice(0,2000);
    else return value;
}

class AddBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                title: '',
                author: '',
                cover: '',
                summary: '',
                file: {},
            },
            loading: false,
            errors: {},
            uploadedFile: {},
            cover: '',
            imagePreviewUrl: ''
        }

        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.addBook = this.addBook.bind(this);
    }

    onChange(e) {
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: isSummaryTooLong(e.target.name,e.target.value) }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if(Object.keys(errors).length === 0) {
            this.setState({
                loading: true
            })

            const data = new FormData();
            data.append('cover', this.state.cover);

            this.props.uploadCover(data)
                .then(res =>{
                    this.setState({
                        data: {
                            ...this.state.data,
                            file: res.file
                        }
                    })

                    this.addBook(this.state.data);
                })
                .catch(err => {
                    this.setState({
                        loading: false
                    })

                    this.showNotification('Błąd!', 'Wystąpił błąd przy przy zapisie okładki. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
                })
            // this.addBook(this.state.data);

            // if(uploadedFile.name) {
            //     this.handleImageUpload(uploadedFile)
            //         .then(res => {
            //             const imageUrl = res.body.secure_url;
            //             if(imageUrl) {
            //                 this.setState({
            //                     data: {
            //                         ...this.state.data,
            //                         cover: imageUrl
            //                     }
            //                 });

            //                 this.addBook(this.state.data);
            //             } else {
            //                 this.setState({
            //                     loading: false
            //                 })                
            //                 this.showNotification('Błąd!', 'Brak adresu do okładki. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
            //             }
            //         })
            //         .catch(err => {
            //             this.setState({
            //                 loading: false
            //             })
            
            //             this.showNotification('Błąd!', 'Wystąpił błąd przy zapisie okładki. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
            //         })
            // } else {
            //     this.addBook(this.state.data);
            // }
        }
    }

    onImageDrop(files) {
        console.log(files[0]);
        this.setState({
            cover: files[0]
          });
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    addBook(data) {
        this.props.addBook(data)
            .then(book =>{
                this.setState({
                    loading: false,
                    data: {
                        title: '',
                        author: '',
                        cover: '',
                        summary: '',
                        file: {}
                    },
                    uploadedFile: {},
                    errors: {}
                });
                this.showNotification('Sukces!', 'Dodano książkę do systemu', 'success', 3000);
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                this.showNotification('Błąd!', 'Wystąpił błąd przy dodawaniu pozycji do systemu. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
            })
    }

    validate(data) {
        const errors = {};

        if(Validator.isEmpty(data.title)) errors.title = "Wprowadź tytuł";
        if(Validator.isEmpty(data.author)) errors.author = "Wprowadź autora";

        return errors;
    }

    handleUploadFile(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            cover: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file);
        // const data = new FormData();
        // data.append('cover', e.target.files[0]);

        // if(this.state.data.file.path) 
        //     data.append('previousUploadedFilePath', this.state.data.file.path)
        // else
        // data.append('previousUploadedFilePath', '')

        // this.props.uploadCover(data)
        //     .then(res =>{
        //         this.setState({
        //             data: {
        //                 ...this.state.data,
        //                 file: res.file
        //             }
        //         })
        //     })
        //     .catch(err => {
        //         this.showNotification('Błąd!', 'Wystąpił błąd przy przy zapisie okładki. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
        //     })
    }

    render() {
        const { errors, loading, data } = this.state;
        return (
            <div className="sass-BookForm">
                <div className="card form">
                    <div className="card-header">
                        <h4>Dodaj książkę</h4>
                    </div>
                    <div className="card-body">
                        { errors.global && <div className="alert alert-danger" role="alert">
                            { errors.global }
                            </div>}
                        { loading ? <div className="loading">
                                        <div className="loader" />
                                        <h2>Dodawanie książki do systemu...</h2>
                                    </div> : 
                        <div>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="formData">
                                    <div className="form-group">
                                        <label htmlFor="Title">Tytuł</label>
                                        <input type="name" className="form-control" id="Title" placeholder="Tytuł" name="title" onChange={this.onChange} autoComplete="false"/>
                                        {errors.title && <InlineError text={errors.title} />}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Author">Autor</label>
                                        <input type="name" spellCheck="false" className="form-control" id="Author" placeholder="Autor" name="author" onChange={this.onChange}/>
                                        {errors.author && <InlineError text={errors.author} />}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Summary">Strzeszczenie (pozostało {2000-data.summary.length} znaków)</label>
                                        <textarea className="form-control" id="Summary" rows="3" name="summary" placeholder="Streszczenie" onChange={this.onChange} value={data.summary} />
                                    </div>
                                    <input type="file" onChange={this.handleUploadFile} />
                                    <button type="submit" className="btn">Dodaj</button>
                                </div>
                                <Dropzone
                                    multiple={false}
                                    accept="image/*"
                                    onDrop={this.onImageDrop.bind(this)}
                                    className="dropZone text-center">
                                        { this.state.cover.preview ? <img src={this.state.cover.preview} alt=""/> 
                                            : <div className="noUploadedFile">
                                                <h4>Brak okładki</h4>
                                                <p>Przeciągnij i upuść tutaj zdjęcie okładki bądź kliknij i wybierz zdjęcie</p>
                                              </div> }
                                </Dropzone>
                            </form>
                        </div> }
                    </div>
                </div>
                <Notificator ref="notificator"/>
            </div>
        );
    }
}

export default connect(null, { addBook, uploadCover })(AddBook);