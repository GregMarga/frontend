import classes from './PatientsList.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import PatientsListItems from './PatientsListItem';
import Card from './UI/Card';


const PatientsList = (props) => {
    let getAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <Container>
            <div className={classes.patientsList}>
                <Card >

                    {props.patients.map((patient) => (

                        <PatientsListItems
                            onDelete={props.onDelete}
                            onEdit={props.onEdit}
                            key={patient._id}
                            id={patient._id}
                            sirname={patient.sirname}
                            name={patient.name}
                            diagnosis={patient.diagnosis}
                            age={(patient.dateOfBirth)?getAge(patient.dateOfBirth):''}
                            tel={patient.tel}
                            amka={patient.amka}
                        />

                    ))}
                    {(props.patients.length === 0) && <Row>
                        <Col className='text-center'>List is empty,add a patient.</Col>
                    </Row>}


                </Card>
            </div>
        </Container>
    );
}

export default PatientsList;