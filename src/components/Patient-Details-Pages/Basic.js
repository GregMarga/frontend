import { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import classes from './Basic.module.css';
import SaveButton from '../UI/SaveButton';
import ErrorModal from '../UI/ErrorModal';
import LoadingSpinner from "../UI/LoadingSpinner";
import { useState, useEffect, useRef, useContext } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from "../../context/auth-context";
import { useHistory } from "react-router-dom";
import moment from 'moment';


const Basic = (props) => {
    const [loading, SetLoading] = useState(false);
    const [loadedBasics, setLoadedBasics] = useState({ name: '', sirname: '', amka: '', diagnosis: '', tel: '', dateOfBirth: '', job: '', gender: '', area: '', address: '', postalCode: '', familyStatus: '', fathersName: '' })

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const history = useHistory();

    const sirnameInputRef = useRef();
    const nameInputRef = useRef();
    const fathersNameInputRef = useRef();
    const TelInputRef = useRef();
    const amkaInputRef = useRef();

    const dateOfBirthInputRef = useRef();
    const placeOfBirthInputRef = useRef();
    const jobInputRef = useRef();
    const familyStatusInputRef = useRef();
    const genderInputRef = useRef();
    const addressInputRef = useRef();
    const areaInputRef = useRef();
    const postalCodeRef = useRef();
    const emailInputRef = useRef();

    const [age, setAge] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/basic`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setLoadedBasics({ placeOfBirth: responseData.placeOfBirth, address: responseData.address, area: responseData.area, job: responseData.job, fathersName: responseData.fathersName, familyStatus: responseData.familyStatus, gender: responseData.gender, postalCode: responseData.postalCode });
            } catch (err) { }
        };
        fetchPatients();
        setAge(props.patient.dateOfBirth);
    }, [sendRequest,props.patient.dateOfBirth]);
    // useEffect(() => {
    //     const fetchBasic = async () => {
    //         try {
    //             const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
    //             console.log(responseData)
    //             setLoadedBasics((prevState) => {
    //                 return { ...prevState, name: responseData.name, sirname: responseData.sirname, amka: responseData.amka, dateOfBirth: responseData.dateOfBirth, diagnosis: responseData.diagnosis, tel: responseData.tel };
    //             })
    //         } catch (err) {
    //         }
    //         fetchBasic();
    //         console.log(loadedBasics.name);
    //         setAge(props.patient.dateOfBirth);
    //     }
    // }, [sendRequest])



    const submitHandler = async (event) => {
        event.preventDefault();
        SetLoading(true);
        try {
            await fetch(`http://localhost:5000/patients/${props.patientId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    name: nameInputRef.current.value,
                    sirname: sirnameInputRef.current.value,
                    dateOfBirth: dateOfBirthInputRef.current.value,
                    amka: amkaInputRef.current.value,
                    tel: TelInputRef.current.value
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            });

        } catch (err) { throw new Error(err) }


        try {
            await fetch(`http://localhost:5000/patients/${props.patientId}/basic`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        placeOfBirth: placeOfBirthInputRef.current.value,
                        job: jobInputRef.current.value,
                        familyStatus: familyStatusInputRef.current.value,
                        gender: genderInputRef.current.value,
                        address: addressInputRef.current.value,
                        area: areaInputRef.current.value,
                        postalCode: postalCodeRef.current.value,
                        fathersName: fathersNameInputRef.current.value

                    }), headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                });

            SetLoading(false);

        } catch (err) { throw new Error(err) }

    }


    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading || loading && <LoadingSpinner asOverlay />}

            {!isLoading && <form className={classes.basicForm} onSubmit={submitHandler}>

                <Container >

                    <Row className='justify-content-center '>
                        <Col className='text-sm-end '>
                            <label htmlFor="sirname">??????????????<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='sirname' type='text' ref={sirnameInputRef} required defaultValue={props.patient.sirname} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="name">??????????<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={nameInputRef} id='name' type='text' required defaultValue={props.patient.name} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="fathers-name">??????????????????</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={fathersNameInputRef} name='fathersName' id='fathers-name' type='text' defaultValue={loadedBasics.fathersName} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="dateOfBirth">???????????????????? ????????????????</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={dateOfBirthInputRef} id='dateOfBirth' type='date' name="dateOfBirth" defaultValue={moment(age).format('YYYY-MM-DD')} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="birth_place" >?????????? ??????????????????</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={placeOfBirthInputRef} id='birth_place' type='text' name="placeOfBirth" defaultValue={loadedBasics.placeOfBirth} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="amka"  >????????</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={amkaInputRef} name='amka' id='amka' type='text' defaultValue={props.patient.amka} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="tel" >????????????????<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={TelInputRef} name='tel' id='tel' type='text' defaultValue={props.patient.tel} required />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="job">??????????????????</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={jobInputRef} name='job' id='job' type='text' defaultValue={loadedBasics.job} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="family_status">???????????????????????? ??????????????????</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <select ref={familyStatusInputRef} id='family_status' name='family_status'>
                                <option value="none" selected disabled hidden>Select an Option</option>
                                <option value='married' selected={loadedBasics.familyStatus === 'married'} >????????????????????????/??</option>
                                <option value='notmarried' selected={loadedBasics.familyStatus === 'notmarried'}>????????????????????/??</option>
                                <option value='divorced' selected={loadedBasics.familyStatus === 'divorced'}>????????????????????????/??</option>
                            </select>
                            {/* <input id='family_status' type='text' /> */}
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="gender">????????</label>
                        </Col>
                        <Col className='text-start'>
                            <select ref={genderInputRef} name='gender' id='gender'  >
                                <option value="none" selected disabled hidden>Select an Option</option>
                                <option value='male' selected={loadedBasics.gender === 'male'}>??????????</option>
                                <option value='female' selected={loadedBasics.gender === 'female'}>????????</option>
                                <option value='other' selected={loadedBasics.gender === 'other'}>????????</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="address">??????????????????</label>
                        </Col>
                        <Col className='text-start'>
                            <input ref={addressInputRef} id='address' type='text' name='address' defaultValue={loadedBasics.address} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="location">??????????????</label>
                        </Col>
                        <Col className='text-start'>
                            <input ref={areaInputRef} id='location' name="area" type='text' defaultValue={loadedBasics.area} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="postalcode">??.??</label>
                        </Col>
                        <Col className='text-start'>
                            <input ref={postalCodeRef} id='postalcode' name='postalCode' type='text' defaultValue={loadedBasics.postalCode} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="email">E-mail</label>
                        </Col>
                        <Col className='text-start'>
                            <input ref={emailInputRef} id='email' type='text' name="email" />
                        </Col>
                    </Row>
                    <Row >
                        <Col  ><SaveButton /></Col>
                    </Row>



                </Container>
            </form>}


        </Fragment>
    );
};

export default Basic;