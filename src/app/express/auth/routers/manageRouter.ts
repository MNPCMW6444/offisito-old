router.get<any, any>("/req", async (req, res) => {
    /!*  const userModel = getUserModel();
    const RequestForAccount = getRequestForAccountModel();
    if (userModel && RequestForAccount)*
    ! /
    /!*  try {
    const {email, idea} = req.body;
    if (!email)
        return res.status(400).json({
            clientError: "The email is missing",
        });
    const existingUser a= await userModel.findOne({email});
    if (existingUser)
        return res.status(400).json({
            clientError: "An account with this email already exists",
        });

    const key = keyv4();

    await new RequestForAccount({
        email,
        key,
        idea,
    }).save();

    const url = `${clientDomain}/register?key=${key}`;

    const {subject, body} = signupreq(url);

    sendEmail(email, subject, body)
        .then(() => console.log("sent registration email - " + body))
        .catch((err) => console.error(err));

    return res.json({result: "email successfully sent to " + email});
}
catch
(err)
{
    console.error(err);

    return res.status(500).json({
        serverError:
            "Unexpected error occurred in the server" + JSON.stringify(err),
    });
}
*
! /
})
;


router.post<any, any>("/signupfin", async (req, res) => {
    const userModel = getUserModel();
    const RequestForAccount = getRequestForAccountModel();
    if (userModel && RequestForAccount)
        try {
            const {key, fullname, password, passwordagain} = req.body;
            if (!key || !fullname || !password || !passwordagain)
                return res.status(400).json({
                    clientError: "At least one of the fields are missing",
                });

            const existingSignupRequest = await RequestForAccount.findOne({key});
            if (!existingSignupRequest) {
                return res
                    .status(400)
                    .json({clientError: "Invalid or expired signup link"});
            }

            const MIN_PASSWORD_STRENGTH = 3;

            const passwordStrength = zxcvbn(password);

            if (passwordStrength.score < MIN_PASSWORD_STRENGTH)
                return res.status(400).json({
                    clientError:
                        "Password isn't strong enough, the value is" +
                        passwordStrength.score,
                });
            if (password !== passwordagain)
                return res.status(400).json({
                    clientError: "Passwords doesn't match",
                });
            const existingUser = await userModel.findOne({
                email: existingSignupRequest.email,
            });
            if (existingUser)
                return res.status(400).json({
                    clientError: "An account with this email already exists",
                });
            if (!existingSignupRequest)
                return res.status(400).json({
                    clientError: "The key is wrong",
                });
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            const savedUser = await new userModel({
                email: existingSignupRequest.email,
                name: fullname,
                passwordHash,
                subscription: "free",
            }).save();
            const ideaModel = getIdeaModel();
            try {
                await new ideaModel({
                    owner: savedUser._id,
                    idea: existingSignupRequest.idea,
                }).save();
            } catch (err) {
            }

            // const userCount = (await userModel.find()).length;

            /!* if (userCount < 50)
            amendTokens(savedUser, (await (await getEmailModel()).find()).some(({email}) => email === savedUser.email) ? 10000 : 1000, `freeforfirst50-the${userCount}`);
        *
            ! /
            const token = jsonwebtoken.sign(
                {
                    id: savedUser._id,
                },
                config?.jwtSecret + ""
            );
            res
                .cookie("jsonwebtoken", token, {
                    httpOnly: true,
                    sameSite:
                        config.nodeEnv === "development"
                            ? "lax"
                            : config.nodeEnv === "production" && "none",
                    secure:
                        config.nodeEnv === "development"
                            ? false
                            : config.nodeEnv === "production" && true,
                })
                .send();
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({serverError: "Unexpected error occurred in the server"});
        }
});

router.post<any, any>("/updatename", async (req, res) => {
    const userModel = getUserModel();
    const RequestForAccount = getRequestForAccountModel();
    if (userModel && RequestForAccount)
        try {
            const user = await authUser(req.cookies.jsonwebtoken);

            if (!user) {
                return res.status(401).json({clientMessage: "Unauthorized"});
            }

            const {name} = req.body;

            if (user) user.name = name;
            await user?.save();
            res.json(user);
        } catch (err) {
            return res.status(401).json({errorMessage: "Unauthorized."});
        }
});


router.post<any, any>("/updatepassword", async (req, res) => {
    const userModel = getUserModel();
    const RequestForAccount = getRequestForAccountModel();
    if (userModel && RequestForAccount)
        try {
            const user = await authUser(req.cookies.jsonwebtoken);

            if (!user) {
                return res.status(401).json({clientMessage: "Unauthorized"});
            }

            const {password} = req.body;
            const passwordStrength = zxcvbn(password);
            if (passwordStrength.score < MIN_PASSWORD_STRENGTH)
                return res.status(400).json({
                    clientError:
                        "Password isn't strong enough, the value is" +
                        passwordStrength.score,
                });

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            if (user) user.passwordHash = passwordHash;
            await user?.save();
            res.json(user);
        } catch (err) {
            return res.status(401).json({errorMessage: "Unauthorized."});
        }
});


router.post<any, any>("/passresreq", async (req, res) => {
    const userModel = getUserModel();
    const RequestForAccount = getRequestForAccountModel();
    if (userModel && RequestForAccount)
        try {
            const {email} = req.body;
            if (!email)
                return res.status(400).json({
                    clientError: "The email is missing",
                });
            const existingUser = await userModel.findOne({email});
            if (!existingUser)
                return res.status(400).json({
                    clientError: "An account with this email couldn't been found",
                });

            const key = keyv4();

            const RequestForPassChange = getRequestForPassChangeModel();

            await new RequestForPassChange({
                email,
                key,
            }).save();

            const url = `${clientDomain}/reset?key=${key}`;

            const {subject, body} = passreset(url);

            sendEmail(email, subject, body)
                .then(() => console.log("sent password reset email"))
                .catch((err) => console.error(err));

            res.json({result: "email successfully sent to " + email});
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({serverError: "Unexpected error occurred in the server"});
        }
});


router.post<any, any>("/passresfin", async (req, res) => {
    const userModel = getUserModel();
    const RequestForAccount = getRequestForAccountModel();
    if (userModel && RequestForAccount)
        try {
            const {email, key, password, passwordagain} = req.body;
            if (!email || !key || !password || !passwordagain)
                return res.status(400).json({
                    clientError: "At least one of the fields are missing",
                });
            const RequestForPassChange = getRequestForPassChangeModel();
            const existingPassChangeReq = await RequestForPassChange.findOne({key});
            if (!existingPassChangeReq || existingPassChangeReq.email !== email) {
                return res
                    .status(400)
                    .json({clientError: "Invalid or expired pass-reset link"});
            }

            const passwordStrength = zxcvbn(password);

            if (passwordStrength.score < MIN_PASSWORD_STRENGTH)
                return res.status(400).json({
                    clientError:
                        "Password isn't strong enough, the value is" +
                        passwordStrength.score,
                });
            if (password !== passwordagain)
                return res.status(400).json({
                    clientError: "Passwords doesn't match",
                });
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            const user = (await userModel.find({email}))[0];
            user.passwordHash = passwordHash;
            await user.save();
            res.json({changed: "yes"});
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({serverError: "Unexpected error occurred in the server"});
        }
});


router.post<any, any>("/updaten", async (req, res) => {
    const userModel = getUserModel();
    const RequestForAccount = getRequestForAccountModel();
    if (userModel && RequestForAccount)
        try {
            const {notifications, newsletter} = req.body;
            if (
                (notifications !== true && notifications !== false) ||
                (newsletter !== true && newsletter !== false)
            )
                return res.status(400).json({
                    clientError: "At least one of the fields are missing",
                });

            const user = await authUser(req.cookies.jsonwebtoken);

            if (!user) {
                return res.status(401).json({clientMessage: "Unauthorized"});
            }

            await user.save();
            res.json({changed: "yes"});
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({serverError: "Unexpected error occurred in the server"});
        }
});