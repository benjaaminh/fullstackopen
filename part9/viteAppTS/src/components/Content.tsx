import { CoursePart } from "../types";
import Part from "./Part";
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {//courseparts is prop and of type coursepart defined in types.ts
    return (
        <div>
            {courseParts.map((course, index) =>//map courseparts with course object and index so key has a value=index
                <div key={index}>
                    <strong>{course.name} {course.exerciseCount}</strong>
                    <Part part={course} />
                    {/*for each part, give part data using Part object, passing course as part props*/}
                    {/*part data is rendered depending on part kind*/}
                    <p></p>
                </div>
            )}
        </div>
    );
};

export default Content;