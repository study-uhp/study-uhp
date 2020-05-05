import SimpleSchema from 'simpl-schema';
import { StudentSessionValues as DataValues } from '../../api/studysessions/StudySessions';

const StudentSessionSchema = new SimpleSchema({
  course: { label: 'Courses', type: String, allowedValues: DataValues.course },
  topic: { label: 'Topic', type: String },
  date: { label: 'Date', type: Date, defaultValue: new Date() },
  timeBegin: { label: 'Begin', type: String },
  timeEnd: { label: 'End', type: String },
  // owner: { label: 'Owner', type: String },
});

export { StudentSessionSchema };
