

const logout = (session) => {
    try {
        console.log(session);
        session.destroy();
        return{
            success: true,
            data: "You are logout!"
        }
    } catch (err) {
        return{
            success: false,
            err: err
        }
    }
}

module.exports = {logout}