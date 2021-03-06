import classes from './NewLabAnalysis.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useReducer, useEffect } from 'react';
import GeneralBlood from './GeneralBlood';
import Thyro from './Thyro';
import Ypofysi from './Ypofysi';
import Parathyro from './Parathyro';
import NewLabSelect from './NewLabSelect';
import { useParams } from 'react-router-dom';


const defaultState = {
    blood: false,
    thyro: false,
    parathyro: false,
    ypofysi: false,
    epinefridio: false,
    eggs: false,
    balls: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'blood':
            return { ...defaultState, blood: true };
        case 'thyro':
            return { ...defaultState, thyro: true };
        case 'parathyro':
            return { ...defaultState, parathyro: true };
        case 'epinefridia':
            return { ...defaultState, epinefridia: true };
        case 'ypofysi':
            return { ...defaultState, ypofysi: true };
        case 'eggs':
            return { ...defaultState, eggs: true };
        case 'balls':
            return { ...defaultState, balss: true };

    }
}


const NewLabAnalysis = (props) => {
    const [visitId, setVisitId] = useState();
    const [loadVisitId, setLoadVisitId] = useState('');
    const type = useParams().type;
    const defaultState = {
        blood: false,
        thyro: false,
        parathyro: false,
        ypofysi: false,
        epinefridio: false,
        eggs: false,
        balls: false
    }
    const [state, dispatch] = useReducer(reducer, defaultState)

    useEffect(() => {
        if (typeof (type) === 'undefined') {
            dispatch({ type: 'blood' })
        } else {
            dispatch({ type: type })
        }
    }, [type])


    function changeVisitDateHandler(visitId) {
        setVisitId(visitId);
    }


    function changeHandler(event) {
        const selectValue = event.target.value;
        switch (selectValue) {
            case 'blood':
                return dispatch({ type: 'blood' });
            case 'thyro':
                return dispatch({ type: 'thyro' });
            case 'parathyro':
                return dispatch({ type: 'parathyro' });
            case 'epinefridia':
                return dispatch({ type: 'epinefridia' });
            case 'ypofysi':
                return dispatch({ type: 'ypofysi' });
            case 'eggs':
                return dispatch({ type: 'eggs' });
            case 'balls':
                return dispatch({ type: 'balls' });
            case '':
                return dispatch({ type: '' });
        };
    }

    return (
        <Container className={classes.mylab}>
            <Row>
                <Col>
                    <NewLabSelect clasname={classes.myselect} loadVisitId={loadVisitId} patientId={props.patientId} changeHandler={changeVisitDateHandler} />
                </Col>

                <Col>
                    <label className={classes.myselect} htmlFor='labifo'>?????????? ????????????????</label>
                    <select onChange={changeHandler} id='labinfo'>
                        <option value='blood' selected={type === 'blood'}>???????????? ??????????????</option>
                        <option value='thyro' selected={type === 'thyro'} >????????????????????</option>
                        <option value='parathyro' selected={type === 'parathyro'}>????????????????????????????</option>
                        <option value='ypofysi' selected={type === 'ypofysi'}>??????????????</option>
                        <option value='epinefridia' selected={type === 'epinefridia'}>??????????????????????</option>
                        <option value='eggs' selected={type === 'eggs'}>??????????????</option>
                        <option value='balls'>????????????</option>
                    </select>
                </Col>
            </Row>
            <Row>
                {state.blood && <GeneralBlood setLoadVisitId={setLoadVisitId} patientId={props.patientId} visitId={visitId} />}
                {state.thyro && <Thyro setLoadVisitId={setLoadVisitId} patientId={props.patientId} visitId={visitId} />}
                {state.ypofysi && <Ypofysi setLoadVisitId={setLoadVisitId} patientId={props.patientId} visitId={visitId} />}
                {state.parathyro && <Parathyro setLoadVisitId={setLoadVisitId} patientId={props.patientId} visitId={visitId} />}
                {state.epinefridia && <Parathyro setLoadVisitId={setLoadVisitId} patientId={props.patientId} visitId={visitId} />}
            </Row>
        </Container>

    );
}

export default NewLabAnalysis;