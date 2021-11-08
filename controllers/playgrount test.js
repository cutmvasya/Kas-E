// beforeAll(() => {
//     Users.create({
//         email: "ong.vasya@gmail.com",
//         password: "123456",
//         confirmPassword: "123456",
//         verifCode: "dbeafa23-ba8d-4876-b306-dc370162295c",
//         fullname: "Cut mouliza",
//         gender: "female",
//         age: 24,
//         profilePicture: "https://res.cloudinary.com/charactermovie/raw/upload/v1634025146/ProfileKasE/profilePictures/profile%20picture%20default%20-%202021-9-12%20-%2014-52-23-801.png",
//     });
// });
// afterAll((done) => {
//     Parent.destroy({ where: {} })
//         .then(() => {
//             done();
//         })
//         .catch((err) => {
//             done(err);
//         });
// });
describe("Register", () => {
    it("should respon with a 200 status code", async() => {
        try {
            const res = await request(app).post("/api/v1/user/register").send({
                email: "meutia.vasya@gmail.com",
                password: "1234567",
                confirmPassword: "1234567",
                verifCode: "dbeafa23-ba8d-4876-b306-dc370162295c",
                fullname: "Cut mouliza",
                gender: "female",
                age: 24,
                profilePicture: "https://res.cloudinary.com/charactermovie/raw/upload/v1634025146/ProfileKasE/profilePictures/profile%20picture%20default%20-%202021-9-12%20-%2014-52-23-801.png",
            });
            console.log("🚀 ~ file: users.test.js ~ line 16 ~ res ~ res", res)
            expect(res.status).toBe(200);
            expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
        } catch (error) {
            console.log("🚀 ~ file: users.test.js ~ line 9 ~ it ~ error", error)
        }
    });
});

describe("Register", () => {
    describe("Successfully create user", () => {
        it("Should return 200 and obj (user)", (done) => {
            let input = {
                email: "meutia.vasya@gmail.com",
                password: "1234567",
                confirmPassword: "1234567",
                verifCode: "dbeafa23-ba8d-4876-b306-dc370162295c",
                fullname: "Cut mouliza",
                gender: "female",
                age: 24,
                profilePicture: "https://res.cloudinary.com/charactermovie/raw/upload/v1634025146/ProfileKasE/profilePictures/profile%20picture%20default%20-%202021-9-12%20-%2014-52-23-801.png",
            };
            request(app)
                .post("/api/v1/user/register")
                .send(input)
                .then((response) => {
                    const { body, status } = response;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("email", input.email);
                    expect(body).toHaveProperty("password");
                    expect(body).toHaveProperty("confirmPassword");
                    expect(body).toHaveProperty("verifCode");
                    expect(body).toHaveProperty("fullname", input.fullname);
                    expect(body).toHaveProperty("gender", input.gender);
                    expect(body).toHaveProperty("age", input.age);
                    expect(body).toHaveProperty("profilePicture");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    //     describe("Failed to create user", () => {
    //         it("Should return 400 and error messages", (done) => {
    //             let input = {
    //                 email: "",
    //                 password: "",
    //             };
    //             let output = [
    //                 "Please insert name",
    //                 "Please insert password",
    //                 "name field is not found",
    //             ];
    //             request(app)
    //                 .post("/api/v1/user/register")
    //                 .send(input)
    //                 .then((response) => {
    //                     const { body, status } = response;
    //                     expect(status).toBe(400);
    //                     expect(body).toHaveProperty("error");
    //                     expect(body).toHaveProperty("errorMessages");
    //                     expect(Array.isArray(body.errorMessages)).toBe(true);
    //                     done();
    //                 })
    //                 .catch((err) => {
    //                     done(err);
    //                 });
    //         });
    //     });
});

describe('Login', () => {
    describe('Success', () => {
        it('Should return 200 and token', (done) => {
            let input = {
                email: "ong.vasya@gmail.com",
                password: "123456"
            };
            request(app)
                .post('/api/v1/user/login')
                .send(input)
                .then((response) => {
                    let { body, status } = response;
                    expect(status).toBe(200);
                    console.log('user token', body.token)
                    expect(body).toHaveProperty("token")
                    expect(typeof body.token).toBe('string')
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        })
    });
    describe("Failed: wrong email", () => {
        it('Should return 400 and "invalid email"', (done) => {
            let input = {
                email: "demo.vasya@gmail.com",
                password: "123456"
            };
            request(app)
                .post('/api/v1/user/login')
                .send(input)
                .then((response) => {
                    let { body, status } = response;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("errorMessages")
                    expect(body.errorMessages).toEqual(
                        expect.arrayContaining(["Invalid email"])
                    );
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
    describe("Failed: wrong password", () => {
        it('Should return 400 and "invalid password"', (done) => {
            let input = {
                email: "ong.vasya@gmail.com",
                password: "12345"
            };
            request(app)
                .post('/api/v1/user/login')
                .send(input)
                .then((response) => {
                    let { body, status } = response;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("errorMessages")
                    expect(body.errorMessages).toEqual(
                        expect.arrayContaining(["Invalid password"])
                    );
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
    describe("Failed: verify email", () => {
        it('Should return 400 and "Please verify your email first"', (done) => {
            let input = {
                email: "ong.vasya@gmail.com",
                password: "123456"
            };
            request(app)
                .post('/api/v1/user/login')
                .send(input)
                .then((response) => {
                    let { body, status } = response;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("errorMessages")
                    expect(body.errorMessages).toEqual(
                        expect.arrayContaining(["Please verify your email first"])
                    );
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});

function loginUser(auth) {
    return function(done) {
        request
            .post('/api/v1/user/login')
            .send({
                email: 'meutia.vasya@gmail.com',
                password: '123456'
            })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}

describe("Register", () => {
    var auth = {};
    before(loginUser(auth));
    it("should respon with a 200 status code", async() => {
        try {
            const res = await (await request(app)
                    .post("/api/v1/user/register"))
                .set("Authorization", `Bearer ${auth.token}`)
                .send({
                    email: "demo.vasya@gmail.com",
                    password: "1234567",
                    confirmPassword: "1234567",
                    verifCode: "dbeafa23-ba8d-4876-b306-dc370162295c",
                    fullName: "Vasya",
                    gender: "female",
                    age: 24,
                    profilePicture: "https://res.cloudinary.com/charactermovie/raw/upload/v1634025146/ProfileKasE/profilePictures/profile%20picture%20default%20-%202021-9-12%20-%2014-52-23-801.png",
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