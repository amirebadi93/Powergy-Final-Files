<?php
header('Content-Type: application/json');

// The target directory where files will be stored
$targetDir = "./Styles/pdf/";
$response = ['success' => false, 'message' => 'An unknown error occurred.'];

// Check if the target directory exists, if not, create it
if (!file_exists($targetDir)) {
    // The 'true' parameter allows creating nested directories
    if (!mkdir($targetDir, 0755, true)) {
        $response['message'] = 'Failed to create upload directory.';
        echo json_encode($response);
        exit;
    }
}

// Check if a file was uploaded
if (isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] == 0) {
    
    // Get the original filename
    $fileName = basename($_FILES['pdfFile']['name']);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    // Allow only PDF file format
    if (strtolower($fileType) == 'pdf') {
        // Move the temporary file to the final destination
        if (move_uploaded_file($_FILES['pdfFile']['tmp_name'], $targetFilePath)) {
            $response['success'] = true;
            $response['message'] = 'File uploaded successfully.';
        } else {
            $response['message'] = 'Sorry, there was an error moving your file.';
        }
    } else {
        $response['message'] = 'Sorry, only PDF files are allowed.';
    }
} else {
    $response['message'] = 'No file was uploaded or an error occurred.';
}

echo json_encode($response);
?>