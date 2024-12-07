function parseLocations(array) {
  const places = [];
  let currentPlace = null;

  array.forEach((line) => {
    line = line.trim();
    console.log("Line" + line);
    // Check for a new title
    if (
      /^\d+\./.test(line) ||
      /^### \d\./.test(line) ||
      /^\*\*\d+\.\s/.test(line)
    ) {
      if (currentPlace) {
        // Push the previous place object to the array
        places.push(currentPlace);
      }
      // Initialize a new place object
      currentPlace = {
        Name: line
          .replace(/^\d+\.\s\*\*/, "")
          .replace(/^\d+\.\*\*/, "")
          .replace(/\*\*$/, "")
          .replace(/^### /, "")
          .replace(/^\*\*\d+\.\s/, "")
          .trim(),
        Description: "",
        Specialty: "",
        Recommendation: "",
      };
    } else if (line.startsWith("Description")) {
      // Extract and set location
      // console.log(line);
      if (currentPlace) {
        currentPlace.Description = line
          .replace("Description: ", "")
          .trim();
      }
    } else if (line.startsWith("Specialty") || line.startsWith("+ ")) {
      // Extract and add recommended activities
      if (line.startsWith("- ") && currentPlace) {
        currentPlace.Specialty = line.replace("- ", "").trim();
      } else if (line.startsWith("+ ") && currentPlace) {
        currentPlace.Specialty = line.replace("+ ", "").trim();
      } else {
        currentPlace.Specialty = line.replace("Specialty: ", "").trim();
      }
    } else if (line.startsWith("Recommendation") || line.startsWith("+ ")) {
      // Extract and add recommended activities
      if (line.startsWith("- ") && currentPlace) {
        currentPlace.Recommendation = line.replace("- ", "").trim();
      } else if (line.startsWith("+ ") && currentPlace) {
        currentPlace.Recommendation = line.replace("+ ", "").trim();
      } else {
        currentPlace.Recommendation = line
          .replace("Recommendation: ", "")
          .trim();
      }
    }
  });
  if (currentPlace) {
    places.push(currentPlace);
  }

  console.log("Places " + places);

  return places;
}
