
class ExampleController {
    async example(
        req,
        res
    ) {
        try {
            res.status(200).send(
                {
                    message: "Hello World",
                    image_link: "https://pbs.twimg.com/profile_images/1421947016339410949/hTpeZAbW_400x400.jpg"
                }
            );
        } catch (error) {
            res.status(401)
        }
    }
}

export default new ExampleController();