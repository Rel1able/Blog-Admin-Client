export default function convertDate(date) {
    return new Date(date).toLocaleDateString("en-GB").split("/").join(".");
}