const request = require("supertest");
const app = require("../index");
const { Users } = require('../models')

beforeAll(async() => {
    const user = await Users.create({
        email: "meutia.vasya@gmail.com",
        password: "123456",
        confirmPassword: "123456",
        // verifCode: "dbeafa23-ba8d-4876-b306-dc370162295c",
        fullName: "Cut Mouliza",
        gender: "female",
        age: "24",
        // profilePicture: "https://res.cloudinary.com/charactermovie/raw/upload/v1634025146/ProfileKasE/profilePictures/profile%20picture%20default%20-%202021-9-12%20-%2014-52-23-801.png"
    })
    console.log(user)
});

afterAll((done) => {
    Users.destroy({ where: {} })
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        });
});

// function loginUser(auth) {
//     return function(done) {
//         request
//             .post('/api/v1/user/login')
//             .send({
//                 email: 'meutia.vasya@gmail.com',
//                 password: '123456'
//             })
//             .expect(200)
//             .end(onResponse);

//         function onResponse(err, res) {
//             auth.token = res.body.token;
//             return done();
//         }
//     };
// }

describe("Register", () => {
    // var auth = {};
    // before(loginUser(auth));
    it("should respon with a 200 status code", async(done) => {
        try {
            const res = await (await request(app).post("/api/v1/user/register")).send({
                email: "meutia.vasya@gmail.com",
                password: "123456",
                confirmPassword: "123456",
                // verifCode: "dbeafa23-ba8d-4876-b306-dc370162295c",
                fullName: "Cut Mouliza",
                gender: "female",
                age: "24",
                // profilePicture: "https://res.cloudinary.com/charactermovie/raw/upload/v1634025146/ProfileKasE/profilePictures/profile%20picture%20default%20-%202021-9-12%20-%2014-52-23-801.png"
            });
            console.log("🚀 ~ file: users.test.js ~ line 16 ~ res ~ res", res.body)
            expect(res.status).toBe(200);
            expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(res.body).toHaveProperty("email", "demo.vasya@gmail.com")
            expect(res.body).toHaveProperty("password", "demo.vasya@gmail.com")
            done()
        } catch (error) {
            console.log("🚀 ~ file: users.test.js ~ line 9 ~ it ~ error", error)
            done(error)
        }
    });

});

// describe("Register", () => {
//     it("failed, status code 400", async() => {
//         try {
//             const res = await request(app).post("/api/v1/user/register").send({
//                 email: "meutia.vasya@gmail.com",
//                 password: "1234567",
//                 confirmPassword: "1234567",
//                 verifCode: "dbeafa23-ba8d-4876-b306-dc370162295c",
//                 fullname: "Cut mouliza",
//                 gender: "female",
//                 age: 24,
//                 profilePicture: "https://res.cloudinary.com/charactermovie/raw/upload/v1634025146/ProfileKasE/profilePictures/profile%20picture%20default%20-%202021-9-12%20-%2014-52-23-801.png",
//             });
//             console.log("🚀 ~ file: users.test.js ~ line 16 ~ res ~ res", res)
//             expect(res.status).toBe(200);
//             expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
//         } catch (error) {
//             console.log("🚀 ~ file: users.test.js ~ line 9 ~ it ~ error", error)
//         }
//     });
// });
// describe('Post Users', () => {
//     it('Should return 200', (done) => {
//         let input = {
//             email: "meutia.vasya@gmail.com",
//             password: "123456",
//             confirmPassword: "123456",
//             verifCode: "dbeafa23-ba8d-4876-b306-dc370162295c",
//             fullName: "Cut Mouliza",
//             gender: "female",
//             age: "24",
//             profilePicture: "https://res.cloudinary.com/charactermovie/raw/upload/v1634025146/ProfileKasE/profilePictures/profile%20picture%20default%20-%202021-9-12%20-%2014-52-23-801.png"
//         };
//         request(app)
//             .post('/api/v1/user/register')
//             .send(input)
//             .then((response) => {
//                 let { body, status, headers } = response;
//                 expect(status).toBe(200);
//                 // expect(body).toHaveProperty("categoryName", input.categoryName);
//                 expect(headers["content-type"]).toEqual(expect.stringContaining("json"));
//                 // expect(typeof body.token).toBe('string')
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     })
// });
// describe("Post Category", () => {
//     it('Should return 400', (done) => {
//         let input = {
//             categoryName: ""
//         };
//         request(app)
//             .post('/api/v1/category/')
//             .send(input)
//             .then((response) => {
//                 let { body, status, headers } = response;
//                 expect(status).toBe(400);
//                 // expect(body).toHaveProperty("errorMessages")
//                 expect(headers["content-type"]).toEqual(expect.stringContaining("json"));
//                 done();
//             })
//             .catch((err) => {
//                 done(err);
//             });
//     });
// });