import { Container, Col, Row } from "react-bootstrap";
import classes from './History.module.css';
import SaveButton from '../UI/SaveButton'
import LoadingSpinner from "../UI/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import { useState,useEffect,useRef,useContext, Fragment } from "react";
import ErrorModal from "../UI/ErrorModal";
import { AuthContext } from "../../context/auth-context";

const History = (props) => {
    const {isLoading,sendRequest,error,clearError}=useHttpClient();

    const auth=useContext(AuthContext);

    const [loadAnamnistiko,setLoadAnamnistiko]=useState({allergies:'',cleronomical:'',personal:'',surgeries:'',drug_usage:'',others:''})
    const allergiesInputRef=useRef();
    const cleronomicalInputRef=useRef();
    const personalInputRef=useRef();
    const surgeriesInputRef=useRef();
    const drug_usageInputRef=useRef();
    const othersInputRef=useRef();


    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/anamnistiko`,'GET',null,{Authorization:'Bearer '+auth.token});
                setLoadAnamnistiko({allergies:responseData.allergies,cleronomical:responseData.cleronomical,personal:responseData.personal,drug_usage:responseData.drug_usage,surgeries:responseData.surgeries,others:responseData.others});
            }catch(err){ }
            
        };
        fetchHistory();
    }, []);

    const submitHandler=async(event)=>{
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/patients/${props.patientId}/anamnistiko`, 'POST',
                JSON.stringify({
                    allergies:allergiesInputRef.current.value,
                    cleronomical:cleronomicalInputRef.current.value,
                    personal:personalInputRef.current.value,
                    surgeries:surgeriesInputRef.current.value,
                    drug_usage:drug_usageInputRef.current.value,
                    others:othersInputRef.current.value
                    

                }), {
                'Content-Type': 'application/json',
                Authorization:'Bearer '+auth.token
            });
        } catch (err) {}
    }

    return (
        <Fragment>
             {isLoading&&<LoadingSpinner />}
             {!!error && <ErrorModal error={error} onClear={clearError} />}
       
        <form className={classes.history} onSubmit={submitHandler}>
            <Container >
                <Row className='justify-content-center '>
                    <Col className='text-sm-end '>
                        <label htmlFor="allergies">??????????????????</label>
                    </Col>
                    <Col className='text-sm-start'>
                        <textarea ref={allergiesInputRef} id='allergies' rows='3' defaultValue={loadAnamnistiko.allergies}/>
                    </Col>
                    <Col className='text-sm-end '>
                        <label htmlFor="klironomiko" >??????????????????????</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea ref={cleronomicalInputRef} id='klironomiko' rows='3' defaultValue={loadAnamnistiko.cleronomical}/>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='text-sm-end '>
                        <label htmlFor="fathers-name">??????????????</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea ref={personalInputRef} id='fathers-name' rows='3' defaultValue={loadAnamnistiko.personal}/>
                    </Col>
                    <Col className='text-sm-end '>
                        <label htmlFor="surgeries">??????????????????????-??????????????</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea ref={surgeriesInputRef} id='surgeries' rows='3' defaultValue={loadAnamnistiko.surgeries}/>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='text-sm-end '>
                        <label htmlFor="drugs_use">???????????? ?????????? ????????????????</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea ref={drug_usageInputRef} name='drug_usage' id='drugs_use' rows='3' defaultValue={loadAnamnistiko.drug_usage}/>
                    </Col>
                    <Col className='text-sm-end '>
                        <label htmlFor='smoking-alcohol'>????????????????-????????????</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea id='smoking-alcohol'name='smoking_alcohol' rows='3' defaultValue={''}/>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='text-sm-end '>
                        <label htmlFor="others">????????</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea ref={othersInputRef} name='others' id='others' rows='4' defaultValue={loadAnamnistiko.others}/>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row >
                        <Col  ><SaveButton/></Col>
                    </Row>

            </Container>
        </form>
        </Fragment>
    );
}

export default History;