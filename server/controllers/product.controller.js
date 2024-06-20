import Product from "../models/product.model.js";


    const addProd = async (req, res) => {
        const { name, price, description, category, subcategory } = req.body;
        try {
          const product = await Product.create({ name, price, description,category,subcategory, image: req.file.filename });
          res.json({ result: product });
        } catch (err) {
          console.error('Error adding product:', err);
          res.status(500).json({ error: 'Failed to add product' });
        }
      };

const getProd = async(req, res) => {
    try {
        const products = await Product.find();
        res.json({ result: products });
      } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
}

const editProd = async(req, res) => {
    const { name, price, description, category,subcategory } = req.body;
  const updateData = { name, price, description, category,subcategory };
  if (req.file) {
    updateData.image = req.file.filename;
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ result: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
}


const deleteProd = async(req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ result: deletedProduct });
      } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product' });
      }
}

export { addProd, getProd, editProd, deleteProd };