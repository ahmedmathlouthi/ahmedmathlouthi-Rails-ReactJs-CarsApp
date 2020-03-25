import React, { Component } from 'react';
import { Card, Button, Feed } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
class Car extends Component {
  
   
goToTask(carId, carModel){
    this.props.history.push({
        pathname : carId + '/tasks',
        state: {
            carId: carId,
            carModel : carModel
        }

    })
}
  
render() {
  return (
    <Card>
        <Card.Content>
            <Card.Header>{this.props.car.model} </Card.Header>
            <Card.Meta> Vin: {this.props.car.vin} </Card.Meta>
        </Card.Content>
        <Card.Content>
            <Feed>
                <Feed.Summary>
                    Mileage: {this.props.car.mileage} Miles
                </Feed.Summary>
                <Feed.Summary> Purshased Date : {this.props.car.purchased_date}</Feed.Summary>
            </Feed>
            <Button basic color='teal' onClick={() => this.goToTask(this.props.car.id, this.props.car.model)}>
                Show Tasks
            </Button>
        </Card.Content>
    </Card>
  );
 }
}

export default withRouter(Car);