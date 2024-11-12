// backend/controllers/codeController.js
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import asyncHandler from "../middlewares/asyncHandler.js";
import decompress from 'decompress';
import Product from "../models/productModel.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getCodeStructure = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product || !product.code) {
            return res.status(404).json({ message: "Product or code not found" });
        }

        const fileName = product.code.split('/').pop();
        const zipPath = path.join(__dirname, '../../uploads', fileName);
        const extractPath = path.join(__dirname, '../../uploads', path.parse(fileName).name);

        if (!fs.existsSync(zipPath)) {
            return res.status(404).json({ message: "Code file not found" });
        }

        if (!fs.existsSync(extractPath)) {
            await decompress(zipPath, extractPath);
        }

        const structure = buildFileTree(extractPath);
        res.json({ files: structure });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Error reading code structure" });
    }
});

const getFileContent = asyncHandler(async (req, res) => {
    const { productId, filePath } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product || !product.code) {
            return res.status(404).json({ message: "Product or code not found" });
        }

        const fileName = product.code.split('/').pop();
        const extractPath = path.join(__dirname, '../../uploads', path.parse(fileName).name);
        const fullPath = path.join(extractPath, filePath);

        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ message: "File not found" });
        }

        const content = fs.readFileSync(fullPath, 'utf8');
        res.send(content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Error reading file content" });
    }
});

const downloadCode = asyncHandler(async (req, res) => {
    const { codeId } = req.params;
    const zipPath = path.join(__dirname, '../../uploads', codeId);

    try {
        if (!fs.existsSync(zipPath)) {
            return res.status(404).json({ message: "File not found" });
        }

        res.download(zipPath);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Error downloading file" });
    }
});

const buildFileTree = (dir, base = '') => {
    const items = fs.readdirSync(dir);
    const tree = [];

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(base, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            tree.push({
                name: item,
                type: 'folder',
                path: relativePath,
                children: buildFileTree(fullPath, relativePath)
            });
        } else {
            tree.push({
                name: item,
                type: 'file',
                path: relativePath,
                language: getFileLanguage(item)
            });
        }
    }

    return tree;
};

const getFileLanguage = (filename) => {
    const ext = path.extname(filename).toLowerCase();
    const languageMap = {
        '.js': 'javascript',
        '.jsx': 'javascript',
        '.ts': 'typescript',
        '.tsx': 'typescript',
        '.html': 'html',
        '.css': 'css',
        '.json': 'json',
        '.md': 'markdown',
        // Add more mappings as needed
    };
    return languageMap[ext] || 'text';
};

export { getCodeStructure, getFileContent, downloadCode };