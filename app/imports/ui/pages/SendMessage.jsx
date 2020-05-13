import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Messages, MessagesSchema } from '../../api/Messages';


/** Renders the Page for adding a document. */
class SendMessage extends React.Component {

    /** On submit, insert the data. */
    submit(data, formRef) {
        const { to, from, body } = data;
        const owner = Meteor.user().username;
        Messages.insert({ to, from, body, owner },
            (error) => {
                if (error) {
                    Swal.fire('Error', error.message, 'error');
                } else {
                    Swal.fire('Success', 'Message sent successfully', 'success');
                    formRef.reset();
                }
            });
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms
     *
     * Right now this is just hacked together for testing. Everything should
     * not be just TextFields! Need to figure out the proper way to set up
     * the Schema and also Uniforms.
     */
    render() {
        let fRef = null;
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center" inverted>Send Message</Header>
                    <AutoForm ref={ref => { fRef = ref; }} schema={MessagesSchema} onSubmit={data => this.submit(data, fRef)} >
                        <Segment>
                            <TextField name='to'/>
                            <TextField name='from'/>
                            <TextField name='body'/>
                            <TextField name='owner'/>
                            <SubmitField value='Submit'/>
                            <ErrorsField/>
                        </Segment>
                    </AutoForm>
                </Grid.Column>
            </Grid>
        );
    }
}

export default SendMessage;
