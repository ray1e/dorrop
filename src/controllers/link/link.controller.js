import { shortenUrl as shortenUrlService } from "../../services/link.services.js";

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
