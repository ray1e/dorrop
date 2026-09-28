import { shortenUrl as shortenUrlService,
    redirectToOriginal as redirectToOriginalService 
 } from "../../services/link.services.js";

export const shortenUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;
    const shortenedUrl = await shortenUrlService(longUrl);
    res.status(200).json({
      success: true,
      message: "Url shortened succesfully",
      data: shortenedUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const redirectToOriginal = async (req, res, next) => {
    try {
        const {hash} = req.params;
        const longUrl = await redirectToOriginalService(hash)
        //res.json({shortlink: shortUrl});
        res.redirect(301, longUrl);
    } catch (error){
        next(error)
    }
}